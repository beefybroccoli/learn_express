/**
 * Module dependencies.
 */

var express = require("../../");
var application = (module.exports = express());

// Faux database
var users = [
  { name: "tj" },
  { name: "tobi" },
  { name: "loki" },
  { name: "jane" },
  { name: "bandit" },
];

// Create HTTP error

function cb_createError(status, message) {
  var err = new Error(message);
  err.status = status;
  return err;
}

// Convert :to and :from to integers

application.param(
  //first parameter
  ["to", "from"],
  //second parameter
  function (request, res, next, number, name) {
    request.params[name] = parseInt(number, 10);
    if (isNaN(request.params[name])) {
      next(cb_createError(400, "failed to parseInt " + number));
    } else {
      next();
    }
  }
);

// Load user by id

application.param(
  //first parameter
  "user",
  //second paramter
  function (request, res, next, id) {
    if ((request.user = users[id])) {
      next();
    } else {
      next(cb_createError(404, "failed to find user"));
    }
  }
);

/**
 * GET index.
 */

application.get("/", function (req, response) {
  response.send("Visit /user/0 or /users/0-2");
});

/**
 * GET :user.
 */

application.get("/user/:user", function (request, response, next) {
  response.send("user " + request.user.name);
});

/**
 * GET users :from - :to.
 */

application.get("/users/:from-:to", function (request, response, next) {
  var from = request.params.from;
  var to = request.params.to;
  var names = users.map(function (user) {
    return user.name;
  });
  response.send("users " + names.slice(from, to + 1).join(", "));
});

/* istanbul ignore next */
if (!module.parent) {
  //port 4015, params - Working with route parameters
  application.listen(4015);
  console.log(
    "Express started on port 4015, params - Working with route parameters"
  );
}
