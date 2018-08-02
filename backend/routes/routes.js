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

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);
function hashPassword(password){
  var hash = crypto.createHash('sha256') //Change this!!!
  hash.update(password);
  return hash.digest('hex');
}

module.exports = function(passport){
  router.post('/login', passport.authenticate('local', function(error, success){
    if (error){
      res.json(false);
    } else {
      res.json(true);
    }
  }))
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

  })


  router.get('/event/:eventID', function(req, res){
    var eventID = req.params.eventID;
    Event.findById(eventID, function(error, event){
      if (error){
        console.log("Failed while finding event")
      } else {
        res.json(event);
      }
    })
  });
  router.get('/profile/:userID', function(req, res){
    var userID = req.params.userID;
    User.findByid(userID, function(error, user){
      if (error){
        console.log("Failed while finding user", error);
      } else {
        res.json(user);
      }
    })
  });
  router.get('/organization/:organizationID', function(req, res){
    var organizationID = req.params.organizationID
    Organization.findById(organizationID, function(error, organization){
      if (error){
        console.log("Failed while finding organization", error);
      } else {
        res.json(organization);
      });
    })
  });
  router.get('/allEvents', function(req, res){
    Event.find({}, function(error, events){
      if (error){
        console.log("Error while finding all events");
      } else {
        res.json(events);
      }
    })
  });
  router.get('/attendees/:eventID', function(req, res){
    var eventID = req.params.eventID
    Event.findById(eventID, function(error, event){
      if (error){
        console.log("Error while finding events");
      } else {
        res.json(event.attendees);
      }
    })
  });
  return router
}
