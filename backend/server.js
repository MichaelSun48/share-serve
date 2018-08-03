var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({secret: 'asdf'}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  const key = {
    type: user.role,
    id: user._id
  }
  done(null, key);
});

passport.deserializeUser((key, done) => {
  console.log("deserializeUser");
  if (key.type === 'volunteer'){
    User.findById(key.id, (err, user) => { //Change this to volunteer
      done(err, user);
    });
  } else {
    Organization.findById(key.id, (err, user) => {
      done(err, user);
    })
  }

});

function hashPassword(password){
  var hash = crypto.createHash('sha256') //Change this!!!
  hash.update(password);
  return hash.digest('hex');
}


passport.use('vol', new LocalStrategy(function(email, password, done){
  console.log("Volunteer Local strategy")
  User.findOne({email: email, password: hashPassword(password)})
  .exec()
  .then(function(user){
    if(user){
      done(null, user)
    }else{
      console.log("Error!")
      done(null, false)
    }
  })
}))
passport.use('org', new LocalStrategy(function(email, password, done){
  console.log("Organization Local strategy")
  Organization.findOne({email: email, password: hashPassword(password)})
  .exec()
  .then(function(user){
    if(user){
      done(null, user)
    }else{
      console.log("Error!")
      done(null, false)
    }
  })
}))
// app.post('/login',    passport.authenticate('local'),function(req, res, next) {
//   res.redirect('/login');
// })
// app.post('/login', function(req, res, next) {
//    console.log('before authenticate');
//    passport.authenticate('local', function(err, user, info) {
//      console.log('authenticate callback');
//      if (err) { return res.send({'status':'err','message':err.message}); }
//      if (!user) { return res.send({'status':'fail','message':info.message}); }
//      req.logIn(user, function(err) {
//        if (err) { return res.send({'status':'err','message':err.message}); }
//        return res.send({'status':'ok'});
//      });
//    })(req, res, next);
//  }, function(req, res){
//   console.log("ANYTHING", req.user)
// })
app.use('/', routes(passport));

var port = process.env.PORT || 3000
app.listen(port, function(){
  console.log("Running on port: " + port);
});
