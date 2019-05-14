let loggerLib = require(__dirname + '/utils/logger.js');
let logger = loggerLib.logger({ indexName: "onboarding-test-kibana-index" }).logger;
logger.log({
    level: 'info',
    message: "Publishing log using winston to kibana"
})
