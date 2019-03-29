$(document).ready(function() {
  var playlistContainer = $(".blog-container");
  var trackCategorySelect = $("#category");
  $(document).on("click", "button.delete", handleTrackDelete);
  $(document).on("click", "button.edit", handleTrackEdit);
  var tracks;

  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getTracks(userId);
  }
  else {
    getTracks();
  }

  function getTracks(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/tracks" + userId, function(data) {
      console.log("Tracks", data);
      tracks = data;
      if (!tracks || !tracks.length) {
        displayEmpty(user);
      } else {
        initializeRows();
      }
    });
  }

  function deleteTrack(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/tracks/" + id
    }).then(function() {
      getTracks(trackCategorySelect.val());
    });
  }

  function initializeRows() {
    playlistContainer.empty();
    var tracksToAdd = [];
    for (var i = 0; i < tracks.length; i++) {
      tracksToAdd.push(createNewRow(tracks[i]));
    }
    playlistContainer.append(tracksToAdd);
  }

  function createNewRow(track) {
    var newTrackCard = $("<div>");
    newTrackCard.addClass("card");
    newTrackCard.addClass("mainarea");
    newTrackCard.addClass("img-shadow");
    var newTrackCardHeading = $("<div>");
    newTrackCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-delete");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-edit");
    var newTrackTitle = $("<h4>");
    var newTrackDate = $("<h4>");
    var newTrackUser = $("<h5>");
    newTrackUser.text(track.User.name);
    newTrackUser.css({
      float: "right",
      color: "white",
      "margin-top": "12px",
      "font-family": "Merriweather Sans",
      "margin-right": "0px",
      "font": "18px"
    });
    newTrackCardHeading.css({
      "padding-top": "2px",
      "padding-bottom": "2px"

    });
    newTrackCard.css({
      "margin-bottom": "25px"
    });
    var newTrackCardBody = $("<div>");
    newTrackCardBody.addClass("card-body");
    newTrackCardBody.css({
      "padding-top": "2px",
      "padding-bottom": "2px"
    });
    var newTrackBody = $("<p>");
    newTrackTitle.text("Track: " + track.title + " ");
    newTrackTitle.css({
      "margin-top": "10px",
      "font-family": "Merriweather Sans"
    });
    newTrackDate.css({
      "margin-top": "10px",
      "font-family": "Merriweather Sans"
    });
    newTrackBody.text(track.url);
    newTrackBody.css({
      "margin-top": "15px",
      "font-family": "Tahoma"
    });
    newTrackBody.html(
      "<a href='" +
      track.url +
      "' target='_blank'>" + "<img src='" + track.image + "'" + "Track URL: " + track.url + "</a>"
    );
 
    newTrackDate.text("Artist: " + track.body);
    newTrackTitle.append(newTrackDate);
    newTrackCardHeading.append(deleteBtn);
    newTrackCardHeading.append(editBtn);
    // newTrackCardHeading.append(newTrackTitle);
    newTrackCardBody.append(newTrackTitle);
    newTrackCardBody.append(newTrackDate);
    newTrackCardHeading.append(newTrackUser);
    newTrackCardBody.append(newTrackBody);
    newTrackCard.append(newTrackCardHeading);
    newTrackCard.append(newTrackCardBody);
    newTrackCard.data("track", track);
    return newTrackCard;
  }

  function handleTrackDelete() {
    var currentTrack = $(this)
      .parent()
      .parent()
      .data("track");
    deleteTrack(currentTrack.id);
    window.location.href = "/users";
  }

  function handleTrackEdit() {
    var currentTrack = $(this)
      .parent()
      .parent()
      .data("track");
    window.location.href = "/cms?track_id=" + currentTrack.id;
  }

  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User # " + id;
    }
    playlistContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px","color": "#fff" });
    messageH2.html(
      "No songs on playlist " +
        partial +
        ", navigate <a class='boldlink' href='/cms" +
        query +
        "'>here</a> in order to get started."
    );
    playlistContainer.append(messageH2);
  }
});
