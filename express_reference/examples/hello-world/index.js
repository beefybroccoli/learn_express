var express = require("../../");

// var app = express();
var app = (module.exports = express());

app.get("/", function (req, response) {
  response.send("Hello World");
});

app.get("/contact", function (req, response) {
  response.render("contact page");
});

/* istanbul ignore next */
if (!module.parent) {
  //port 4009, hello-world - Simple request handler
  app.listen(4009);
  console.log(
    "Express started on port 4009, hello-world - Simple request handler"
  );
}
