/**
 * Module dependencies.
 */

var express = require("../..");
var hash = require("pbkdf2-password")();
var path = require("path");
var session = require("express-session");

var app = (module.exports = express());

// config

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "shhhh, very secret",
  })
);

// Session-persisted message middleware

app.use(function (req, res, next) {
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = "";
  if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
  if (msg) res.locals.message = '<p class="msg success">' + msg + "</p>";
  next();
});

// dummy database

var users = {
  tj: { name: "tj" },
};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)

hash(
  { password: "foobar" },
  //start anynomous function
  function (err, pass, salt, hash) {
    if (err) throw err;
    // store the salt & hash in the "db"
    users.tj.salt = salt;
    users.tj.hash = hash;
  } //end anynomous function
);

// Authenticate using our plain-object database of doom!

function cb_authenticate(name, pass, cb_function) {
  if (!module.parent) console.log("authenticating %s:%s", name, pass);
  var user = users[name];
  // query the db for the given username
  if (!user) return cb_function(new Error("cannot find user"));
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash(
    { password: pass, salt: user.salt },
    //start anynomous function
    function (err, pass, salt, hash) {
      if (err) return cb_function(err);
      if (hash === user.hash) return cb_function(null, user);
      cb_function(new Error("invalid password"));
    } //end anynomous function
  );
}

function cb_restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = "Access denied!";
    res.redirect("/login");
  }
}

app.get("/", function (req, response) {
  response.redirect("/login");
});

app.get("/restricted", cb_restrict, function (req, response) {
  response.send(
    'Wahoo! restricted area, click to <a href="/logout">logout</a>'
  );
});

app.get("/logout", function (request, response) {
  // destroy the user's session to log them out
  // will be re-created next request
  request.session.destroy(function () {
    response.redirect("/");
  });
});

app.get("/login", function (req, response) {
  response.render("login");
});

app.post("/login", function (req, res) {
  cb_authenticate(
    req.body.username,
    req.body.password,
    //start anynomous function
    function (err, user) {
      if (user) {
        // Regenerate session when signing in
        // to prevent fixation
        req.session.regenerate(
          //start anynomous function
          function () {
            // Store the user's primary key
            // in the session store to be retrieved,
            // or in this case the entire user object
            req.session.user = user;
            req.session.success =
              "Authenticated as " +
              user.name +
              ' click to <a href="/logout">logout</a>. ' +
              ' You may now access <a href="/restricted">/restricted</a>.';
            res.redirect("back");
          } //end anynomous function
        );
      } //end if
      else {
        req.session.error =
          "Authentication failed, please check your " +
          " username and password." +
          ' (use "tj" and "foobar")';
        res.redirect("/login");
      } //end else
    } //end anynomous function
  );
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(6001);
  console.log("Express started on port 6001");
}
