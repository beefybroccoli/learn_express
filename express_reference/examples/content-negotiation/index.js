var express = require("../../");
var app = (module.exports = express());
var users = require("./db");

// so either you can deal with different types of formatting
// for expected response in index.js
app.get("/", function (req, response) {
  response.format(
    //start object
    {
      html: function () {
        response.send(
          "<ul>" +
            users
              .map((user) => {
                return "<li>" + user.name + "</li>";
              })
              .join("") +
            "</ul>"
        );
      },

      text: function () {
        response.send(
          users
            .map(function (user) {
              return " - " + user.name + "\n";
            })
            .join("")
        );
      },

      json: function () {
        response.json(users);
      },
    } //end object
  );
});

// or you could write a tiny middleware like
// this to add a layer of abstraction
// and make things a bit more declarative:

function format(path) {
  var obj = require(path);
  return function (req, res) {
    res.format(obj);
  };
}

app.get("/users", format("./users"));

/* istanbul ignore next */
if (!module.parent) {
  app.listen(4002);
  console.log("Express started on port 4002");
}