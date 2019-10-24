var express = require('express');

module.exports = function(app) {
  var router = express.Router();

  /*
   * Healthcheck for the application.  Receives a GET request and makes a GET request to the PowerAI Vision stuite
   */
  // TODO: Connect to the PowerAI Vision suite
  router.get('/', function (req, res, next) {
    res.json({
      status: 'UP',
      message: 'Shim is live.'
    });
  });

  app.use("/healthcheck", router);
}
