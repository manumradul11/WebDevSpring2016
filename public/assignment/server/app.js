module.exports = function (app) {
  var mongoose = require('mongoose');
  mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/FreeFood');

  var userModel = require("./models/user.model.js")(mongoose);
  require("./services/user.service.server.js")(app,userModel);

  var formModel = require("./models/form.model.js")(mongoose);
  require("./services/form.service.server.js")(app,formModel);

  require("./services/field.service.server.js")(app,formModel);

};
