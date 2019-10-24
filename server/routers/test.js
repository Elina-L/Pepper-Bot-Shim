var express = require('express');

module.exports = function(app) {
  var router = express.Router();

  var cnt = 0;
  router.get('/', function (req, res, next) {
    cnt += 1;
    res.send(`Hello banana? GET requests: ${cnt}`);
  });

  app.use("/test", router);
}
