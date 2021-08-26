/**
 * Module dependencies.
 */

var express = require("../../");

var app = (module.exports = express());

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect respects this prop as well)

function cb_error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// if we wanted to supply more than JSON, we could use something similar to the content-negotiation example.

// here we validate the API key, by mounting this middleware to "/api" meaning only paths prefixed with "/api" will cause this middleware to be invoked

app.use(
  //first parameter
  "/api",
  //second parameter
  function (request, res, next) {
    var key = request.query["api-key"];

    // key isn't present
    if (!key) {
      return next(cb_error(400, "api key required"));
    }

    // key is invalid
    else if (!~apiKeys.indexOf(key)) {
      return next(cb_error(401, "invalid api key"));
    }

    // all good, store req.key for route access
    else {
      request.key = key;
      next();
    }
  }
);

// map of valid api keys, typically mapped to account info with some sort of database like redis.
// api keys do _not_ serve as authentication, merely to track API usage or help prevent malicious behavior etc.

var apiKeys = ["foo", "bar", "baz"];

// these two objects will serve as our faux database

var repos = [
  { name: "express", url: "https://github.com/expressjs/express" },
  { name: "stylus", url: "https://github.com/learnboost/stylus" },
  { name: "cluster", url: "https://github.com/learnboost/cluster" },
];

var users = [{ name: "tobi" }, { name: "loki" }, { name: "jane" }];

var userRepos = {
  tobi: [repos[0], repos[1]],
  loki: [repos[1]],
  jane: [repos[2]],
};

// we now can assume the api key is valid, and simply expose the data

// example: http://localhost:4026/api/users/?api-key=foo
app.get("/api/users", function (req, response, next) {
  response.send(users);
});

// example: http://localhost:4026/api/repos/?api-key=foo
app.get("/api/repos", function (req, response, next) {
  response.send(repos);
});

// example: http://localhost:4026/api/user/tobi/repos/?api-key=foo
app.get("/api/user/:name/repos", function (request, response, next) {
  var name = request.params.name;
  var user = userRepos[name];

  if (user) response.send(user);
  else next();
});

// middleware with an arity of 4 are considered error handling middleware.
// When you next(err) it will be passed through the defined middleware in order,
// but ONLY those with an arity of 4, ignoring regular middleware.
app.use(function (err, req, res, next) {
  // whatever you want here, feel free
  // to populate properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// our custom JSON 404 middleware.
// Since it's placed last it will be the last middleware called,
// if all others invoke next() and do not respond.
app.use(function (req, res) {
  res.status(404);
  res.send({ error: "Lame, can't find that" });
});

//==========start application==================
/* istanbul ignore next */
if (!module.parent) {
  //port 4026, web-service - Simple API service
  app.listen(4026);
  console.log("Express started on port 4026, web-service - Simple API service");
}
