module.exports = function(app) {
  var express = require('express');
  var userRouter = express.Router();

  userRouter.get('/', function(req, res) {
    res.send({
      ExternalId: 1234,
      InternalId: 1234,
      Username: "joe.bloggs@fourth.com",
      EmailAddress: "joe.bloggs@fourth.com",
      Locale: "en_US",
      FirstName: "Joe",
      LastName: "Bloggs"
    });
  });

  app.use('/userEndpoint', userRouter);
};
