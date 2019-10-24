// Uncomment following to enable zipkin tracing, tailor to fit your network configuration:
// var appzip = require('appmetrics-zipkin')({
//     host: 'localhost',
//     port: 9411,
//     serviceName:'frontend'
// });

require('appmetrics-dash').attach();
require('appmetrics-prometheus').attach();
const appName = require('./../package').name;
const http = require('http');
const express = require('express');
const log4js = require('log4js');
const localConfig = require('./config/local.json');
const path = require('path');
const bodyParser = require('body-parser');

const logger = log4js.getLogger(appName);
logger.level = process.env.LOG_LEVEL || 'info'
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(log4js.connectLogger(logger, { level: logger.level }));
const serviceManager = require('./services/service-manager');
require('./services/index')(app);
require('./routers/index')(app, server);

// Add your code here

/*
 * Detect an object in a provided media/image or media/video file through PowerAI Vision and return the result to the requester
 */
// app.post('/detect', function(req, res) {
//   // Check if a provided item is of appropriate MIME type
//     // If so, send to PowerAI
//     // If not, return a 400 error
//   // TODO: Since Pepper (may eventually) expect an image, if a request fails, return an http.cat?
// });

// TODO: All other methods: return 405 errors?

const port = process.env.PORT || localConfig.port;
server.listen(port, function(){
  logger.info(`bananaAIshimnodejs listening on http://localhost:${port}/appmetrics-dash`);
  logger.info(`bananaAIshimnodejs listening on http://localhost:${port}`);
});

app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

app.use(function (err, req, res, next) {
	res.sendFile(path.join(__dirname, '../public', '500.html'));
});

module.exports = server;