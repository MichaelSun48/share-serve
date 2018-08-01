var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local');
var session = require('express-session');
var auth = require('./routes/auth');
var routes = require('./routes/routes');

var models = require('./models/models');
var app = express();
var User = models.User;
var Event = models.Event;
var Organization = models.Organization;

var connect = process.env.MONGODB_URI;
mongoose.connect(connect);

//app.use(session({secret: process.env.secret}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => { //Change this to volunteer
    done(err, user);
  });
});

function hashPassword(password){
  var hash = crypto.createHash('sha256') //Change this!!!
  hash.update(password);
  return hash.digest('hex');
}


passport.use(new LocalStrategy(
  function(email, password, done){
    //TODO
  }
))

app.use('/', auth(passport));
app.use('/', routes);

var port = process.env.PORT || 3000
app.listen(port, function(){
  console.log("Running on port: " + port);
});
