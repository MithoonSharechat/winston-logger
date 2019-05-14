var config = {
    "logFile": __dirname + "/../logFiles/log.logs",
    "exceptionFile" : __dirname + "/../logFiles/exception.logs",
    "maxLogFileSize": 1000000,
    "intervalBetweenCalls": 5000,
    "esHost": "https://vpc-log-dump-pfy2smttiqzrcwbag6nqndo42u.ap-south-1.es.amazonaws.com",
}

module.exports = config;
