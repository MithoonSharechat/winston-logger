let winston = require('winston');
let config = require(__dirname + '/../config/elasticSearchConfig.js');

let logger =  winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: config.logFile,
            maxsize: config.maxLogFileSize,
            tailable: true,
            maxFiles: 100
        })
    ]
});

let exceptionLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: config.exceptionFile,
            handleExceptions: true,
            timestampL: true,
            json: true,
            maxsize: config.maxLogFileSize,
            tailable: true,
            maxFiles: 100
        })
    ]
});

let loggersMap = {'logger': logger, 'exceptionLogger': exceptionLogger};

let logFetcher = function (options, cb){
    var loggerType = options.loggerType;
    delete(options.loggerType);
    loggersMap[loggerType].query(options, function (err, results) {
      if (err) {
        cb(err, null);
        return;
      }
      cb(null, results.file);
      return;
    });
  }

  module.exports.logFetcher = logFetcher;
  module.exports.logger = logger;
  module.exports.exceptionLogger = exceptionLogger;