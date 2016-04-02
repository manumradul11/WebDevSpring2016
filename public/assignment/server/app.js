module.exports = function (app,mongoose) {

  var userModel = require("./models/user.model.js")(mongoose);
  require("./services/user.service.server.js")(app,userModel);

  var formModel = require("./models/form.model.js")(mongoose);
  require("./services/form.service.server.js")(app,formModel);

  require("./services/field.service.server.js")(app,formModel);

};
