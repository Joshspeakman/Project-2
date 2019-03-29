var express = require("express");
require("dotenv").config();
var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/track-api-routes.js")(app);

var syncOptions = { force: false };
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

module.exports = app;