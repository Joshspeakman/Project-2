var db = require("../models");

module.exports = function(app) {

  app.get("/api/tracks", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Track.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbTrack) {
      res.json(dbTrack);
    });
  });

  app.get("/api/tracks/:id", function(req, res) {
    db.Track.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbTrack) {
      res.json(dbTrack);
    });
  });

  app.post("/api/tracks", function(req, res) {
    db.Track.create(req.body).then(function(dbTrack) {
      res.json(dbTrack);
    });
  });

  app.delete("/api/tracks/:id", function(req, res) {
    db.Track.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTrack) {
      res.json(dbTrack);
    });
  });

  app.put("/api/tracks", function(req, res) {
    db.Track.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbTrack) {
      res.json(dbTrack);
    });
  });
};
