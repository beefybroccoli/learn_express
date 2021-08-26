var express = require("../../");

var app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

/* istanbul ignore next */
if (!module.parent) {
  //port 4009, hello-world - Simple request handler
  app.listen(4009);
  console.log(
    "Express started on port 4009, hello-world - Simple request handler"
  );
}
