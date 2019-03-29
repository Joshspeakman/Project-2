$(document).ready(function() {
 
  var artistInput = $("#artist");
  console.log(artistInput);

  var titleInput = $("#title");
  console.log(titleInput);
  var userSelect = $("#user");
  var track;
  var artist;

 


  var url = window.location.search;
  var trackId;
  var userId;
  var updating = false;
 
  if (url.indexOf("?track_id=") !== -1) {
    trackId = url.split("=")[1];
    getTrackData(trackId, "track");
  }
  else if (url.indexOf("?author_id=") !== -1) {
    userId = url.split("=")[1];
  }
  
  getAuthors();

  function getAuthors() {
    $.get("/api/users", renderAuthorList);
  }

  function renderAuthorList(data) {
    if (!data.length) {
      window.location.href = "/users";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createAuthorRow(data[i]));
    }
    userSelect.empty();
    console.log(rowsToAdd);
    console.log(userSelect);
    userSelect.append(rowsToAdd);
    userSelect.val(userId);
  }

  function createAuthorRow(author) {
    var listOption = $("<option>");
    listOption.attr("value", author.id);
    listOption.text(author.name);
    return listOption;
  }
  
  function updateTrack(track) {
    $.ajax({
      method: "PUT",
      url: "/api/tracks",
      data: track
    }).then(function() {
      window.location.href = "/users";
    });
  }

  function submitTrack(track) {
    $.post("/api/tracks", track, function() {
      window.location.href = "/users";
    });
  }
  function getTrackData(id, type) {
    var queryUrl;
    switch (type) {
    case "track":
      queryUrl = "/api/tracks/" + id;
      break;
    case "author":
      queryUrl = "/api/users/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.userId || data.id);
        titleInput.val(data.title);
        artistInput.val(data.body);
        urlInput.val(data.url);
        imageInput.val(data.image);
        userId = data.UserId || data.id;
        updating = true;
      }
    });
  }

  $(".submit").on("click",function(event) {
    event.preventDefault();
    track = $("#title").val().trim();
    artist = $("#artist").val().trim();

    if (
      !titleInput.val().trim() ||
      !artistInput.val().trim() ||
      !userSelect.val()
    ) {
      return;
    }
 
    //Set Variables
    // var lastfm = new Lastfm(keys.lastfm);
    var lastfm = "API_KEY";
    
    var queryURL = "https://ws.audioscrobbler.com/2.0/?method=track.search&track=" + track + "&artist=" + artist + "&api_key=" + lastfm + "&format=json";
    console.log(queryURL);

    $.ajax({
 
      url: queryURL,
      method: "GET"
  
    }).then(function(response){
      

      for (i = 0; i < 1; i++) {
            
        var artistName = response.results.trackmatches.track[i].artist;
        console.log(artistName);   
        var trackName = response.results.trackmatches.track[i].name;
        console.log(trackName);
        var artistURL = response.results.trackmatches.track[i].url;
        console.log(artistURL);
        var artistPicture = response.results.trackmatches.track[i].image[2]["#text"];
        console.log(artistPicture);

      } 


      var newTrack = {
        title: trackName,
        body: artistName,
        url: artistURL,
        image: artistPicture,
        UserId: userSelect.val()
      };
      console.log(newTrack);

      if (updating) {
        newTrack.id = trackId;
        updateTrack(newTrack);
      } else {
        submitTrack(newTrack);
      }
    

    });
  
  }
  );
});
