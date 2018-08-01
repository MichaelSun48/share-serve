var express = require('express');
var models = require('../models/models');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = models.User;
var Event = models.Event;
var Organization = models.Organization;

var router = express.Router();

mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});

mongoose.connect(process.env.MONGODB_URI);

router.post('/register', function(req, res){
  console.log('Successfully linked');
  var newUser = new User({
    firstName: req.body.fname,
    lastName: req.body.lname,
    picture: req.body.picture,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    bio: req.body.bio,
    password: req.body.password,
  });
  newUser.save(function(error, success){
    if (error){
      console.log("Failed to save new user", error);
    } else {
      console.log("Sucessfully saved new user");
    }
  })
});
router.post('/login', function(req, res){

});
router.post('/signup', function(req, res){
  var eventID = req.body.eventID;
  var userID = req.body.userID;
  Event.findById(eventID, function(error, event){
    if (error){
      console.log("Failed while finding event")
    } else {
      event.attendees.push(userID);
    }
  })
});
router.post('/event', function(req, res){
  var eventID = req.body.eventID;
  Event.findById(eventID, function(error, event){
    if (error){
      console.log("Failed while finding event")
    } else {
      //TODO
    }
  })
});
router.get('/user', function(req, res){
  // TODO:
});
router.get('/organization', function(req, res){
  // TODO:
});
router.get('/event', function(req, res){
  // TODO:
});
router.get('/attendees', function(req, res){
  // TODO:
});

module.exports = router;
