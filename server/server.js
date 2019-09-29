var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var logger = require('./util/logger');

require('mongoose').connect(config.db.url, { useNewUrlParser: true , useFindAndModify : false});

if(config.seed){
    require('./util/seed');
}

var err = require('./middleware/err');

require('./middleware/appMiddleware')(app);

app.use('/api', api);
app.use(err());

module.exports = app;
