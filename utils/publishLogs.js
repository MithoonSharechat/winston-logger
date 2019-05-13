var logger = require(__dirname + '/winstonLogger.js');
var config = require(__dirname + '/../config/elasticSearchConfig.js');
var elasticsearch = require('elasticsearch');
var client = null;


function init(options){
    console.log("Repititive functions")
    sendLogs(options);
    sendExceptions(options);
}
  
  function main(options){
    var interval = options.intervalBetweenCalls ? options.intervalBetweenCalls:config.intervalBetweenCalls;
    var esHost = options.esHost?options.esHost:config.esHost;
    client = new elasticsearch.Client({
      host: esHost
    });
    setInterval(function(){
      init(options);
    }, interval);
  }
  
  /**
  * get logs from winston and sends it to elasticsearch
  **/
  function sendLogs(options){
    var indexName = options.indexName? options.indexName: new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear();
    logger.logFetcher({'loggerType': 'logger' ,'from': new Date - config.intervalBetweenCalls, 'until': new Date, 'order': 'asc'}, function(err, results){
      if (err){
        console.log(err);
        return;
      }
      console.log("Fetched",results.length,"errors");
      var errorLogEvents = [];
      // console.log(results);
      for(var i = 0; i < results.length; i++){
        var tmpObj = {timestamp: new Date(results[i].timestamp).getTime()};
        delete(results[i].timestamp);
        tmpObj = results[i];
        errorLogEvents.push({index:{_index:indexName,_type:'error',_id:new Date().toDateString()+'_'+Date.now()+'_'+i.toString()}});
        errorLogEvents.push(tmpObj);
      }
      if(errorLogEvents.length){
        client.bulk({
          body: errorLogEvents,
        }, function(err, resp){
	  console.log("consoling err", err, JSON.stringify(resp));
          if(err) console.log(err)
            else console.log(results.length,'error logs added successfully');
        });
      }
    });
  }
  
  
  /**
  * gets exceptions logged and sends it elasticsearch
  **/
  function sendExceptions(options){
    var indexName = options.indexName? options.indexName: new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear();
    logger.logFetcher({loggerType: 'exceptionLogger' ,from: new Date - config.intervalBetweenCalls, until: new Date, order: 'asc'}, function(err, results){
      if (err){
        console.log(err);
      } else {
        console.log("Fetched",results.length,"exceptions");
        var exceptionLogEvents = [];
        for(var i = 0; i < results.length; i++){
          var tmpObj = {timestamp: new Date(results[i].timestamp).getTime()};
          delete(results[i].timestamp);
          tmpObj = results[i];
          exceptionLogEvents.push({index:{_index:indexName,_type:'exception',_id:new Date().toDateString()+'_'+Date.now()+'_'+i.toString()}});
          exceptionLogEvents.push(tmpObj);
        }
        if(exceptionLogEvents.length){
          client.bulk({
            body: exceptionLogEvents,
          }, function(err, resp){
            console.log("consoling err", err, JSON.stringify(resp));
            if(err) console.log(err)
              else console.log(results.length,'exception logs added successfully');
          });
        }
      }
    });
  }
  console.log(process.argv);
  main(JSON.parse(process.argv[2]));
