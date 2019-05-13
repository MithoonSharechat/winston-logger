let winstonLogger = require('./winstonLogger.js');

module.exports.logger = function(options) {
    const exec = require('child_process').exec;
    console.log("starting child process", options);
	exec('ps aux | grep publishLogs', function(err,stdout,stderr){
                console.log("consoling err", err);
                console.log("consoling stdout", stdout);
                console.log("consoling stderr", stderr);
		if (err) {
            console.log("Error while starting the service");
			return;
		}
		if(stdout.indexOf('publishLogs.js') == -1) {
            console.log("finally starting the service");
			var args = [require.resolve('./publishLogs'),JSON.stringify(options)];
			const spawn  = require('child_process').spawn;
			const child = spawn('node', args, {
				detached: true,
				stdio: 'ignore'
			});
			child.unref();
		}
	});
	return {
		logger: winstonLogger.logger,
		exceptionLogger: winstonLogger.exceptionLogger
	}
}
