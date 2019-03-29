var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  app.get("/playlist", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/playlist.html"));
  });

  app.get("/authors", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user-manager.html"));
  });

  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user-manager.html"));
  });
  

};
