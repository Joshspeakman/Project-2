$(document).ready(function() {
  var nameInput = $("#author-name");
  var authorList = $("tbody");
  var authorContainer = $(".author-container");

  $(document).on("submit", "#author-form", handleAuthorFormSubmit);
  $(document).on("click", ".delete-author", handleDeleteButtonPress);

  getAuthors();

  function handleAuthorFormSubmit(event) {
    event.preventDefault();
    if (
      !nameInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }

    upsertAuthor({
      name: nameInput.val().trim()
    });
  }

  function upsertAuthor(authorData) {
    $.post("/api/users", authorData).then(getAuthors);
  }

  function createAuthorRow(authorData) {
    var newTr = $("<tr>");
    newTr.data("user", authorData);
    newTr.append("<td>" + authorData.name + "</td>");
    if (authorData.Tracks) {
      newTr.append("<td> " + authorData.Tracks.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append(
      "<td><a href='/playlist?user_id=" +
        authorData.id +
        "'>Go to Playlist</a></td>"
    );

    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-author'>Delete User</a></td>"
    );
    return newTr;
  }

  function getAuthors() {
    $.get("/api/users", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderAuthorList(rowsToAdd);
      nameInput.val("");
    });
  }

  function renderAuthorList(rows) {
    authorList
      .children()
      .not(":last")
      .remove();
    authorContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      authorList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an User before you can add a Track.");
    authorContainer.append(alertDiv);
  }

  function handleDeleteButtonPress() {
    var listItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("user");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/users/" + id
    }).then(getAuthors);
  }
});
