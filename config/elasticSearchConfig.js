var config = {
    "logFile": __dirname + "/../logFiles/log.logs",
    "exceptionFile" : __dirname + "/../logFiles/exception.logs",
    "maxLogFileSize": 1000000,
    "intervalBetweenCalls": 5000,
    "esHost": "https://vpc-log-dump-pfy2smttiqzrcwbag6nqndo42u.ap-south-1.es.amazonaws.com",
    "microServiceBaseUrl": 'https://dev-kube-api.sckops.com/',
    "user_service": "http://user-service.sckops.com/user-service",
    "account_service": "http://account-service.sckops.com/account-service",
    "x_sharechat_authorized_userId": "X-SHARECHAT-AUTHORIZED-USERID"
}

module.exports = config;
