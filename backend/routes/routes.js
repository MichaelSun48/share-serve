var express = require('express');
var models = require('../models/models');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto')

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
function repeatCheck(array, object){
  for (var i = 0; i < array.length; i++){
    if (array[i]._id === object._id){
      return false;
    }
  }
  return true;
}

module.exports = function(passport){
  router.post('/login', passport.authenticate('vol', {
    successRedirect: '/login',
    errorRedirect: '/login'
  }))
  router.get('/login', function(req, res){
    if (req.user){
      res.status(200).json({success: true});
    } else {
      res.status(400).json({success: false});
    }
  })
  router.post('/orgLogin', passport.authenticate('org', {
    successRedirect: '/orgLogin',
    errorRedirect: '/orgLogin'
  }))
  router.get('/orgLogin', function(req, res){
    if (req.user){
      res.status(200).json({success: true});
    } else {
      res.status(400).json({success: false});
    }
  })
  router.post('/orgRegister', function(req, res){
    var newOrganization = new Organization({
      name: req.body.name,
      description: req.body.description,
      picture: req.body.picture,
      email: req.body.email,
      link: req.body.link,
      password: hashPassword(req.body.password),
      upcoming: req.body.upcoming,
    })
    newOrganization.save(function(error, success){
      if (error){
        console.log("Failed to save new organization", error);
        res.status(500).json({success: false});
      } else {
        console.log("Successfully saved new organization");
        res.status(200).json({success: true});
      }
    })
  })
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
      password: hashPassword(req.body.password),
    });
    newUser.save(function(error, success){
      if (error){
        console.log("Failed to save new user", error);
        res.status(500).json({success: false});
      } else {
        console.log("Sucessfully saved new user");
        res.status(200).json({success: true});
      }
    })
  });

  router.post('/signup', function(req, res){
    var eventID = req.body.eventID;
    var userEmail = req.body.userEmail;
    //console.log("backedn wrking", eventID, userEmail)
    Event.findById(eventID, function(error, event){
      if (error){
        //console.log("Failed while finding event");
        res.status(500).json({success: false});
      } else {
        //console.log('something')
        User.findOne({email: userEmail}, function(error, user){
          if (error){
            console.log("Failed while finding user to push into attendees", error);
          } else {
            //console.log("INFO: "+ event.attendees + " " + !repeatCheck(event.attendees, user))
            if (repeatCheck(event.attendees, user)){
              console.log("work please")
              event.attendees.push(user);
              event.save();
              console.log("Successfully added user to event")
            } else if(!repeatCheck(event.attendees, user)) {
              for(var i = 0; i < event.attendees.length; i++){
                if(event.attendees[i].email === userEmail){
                  var arr1 = event.attendees.slice(0, i)
                  var arr2 = event.attendees.slice(i + 1, event.attendees.length)
                  event.attendees = arr1.concat(arr2)
                  event.save();
                  console.log('User removed.')
                }
              }
            }
          }
        })
      }
      res.status(200).json({success: true});
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
  router.get('/profile/:email', function(req, res){
    var email = req.params.email;
    console.log(email);
    User.findOne({"email": email}, function(error, success){
      if (error){
        console.log("Failed while finding user", error);
        res.status(500).json({success: false})
      } else{
        console.log("Supposed user: ", success);
        res.json(success);
      }
    })

  });
  router.get('/profileID/:userID', function(req, res){
    console.log("Trying to get user rn");
    var userID = req.params.userID;
    User.findById(userID, function(error, user){
      if (error){
        console.log("Failed while finding user", error);
        res.status(500).json({success: false});
      } else {
        console.log("Successfully found user", user)
        res.json(user);
      }
    })
  });
  router.get('/organizationByName/:orgName', function(req, res){
    var orgName = req.params.orgName;
    Organization.findOne({name: orgName}, function(error, org){
      if (error){
        console.log("Failed while finding organization", error);
        res.status(500).json({success: false})
      } else {
        console.log("Successfully found organization by name", org);
        res.json(org);
      }
    })
  })
  router.get('/organization/:email', function(req, res){
    var email = req.params.email;
    Organization.findOne({"email": email}, function(error, organization){
      if (error){
        console.log("Failed while finding organization", error);
      } else {
        console.log("Successfully found organization by email", organization)
        res.json(organization);
      }
    });
  });
  router.post('/addEventToOrganization/:orgEmail', function(req, res){
    var orgEmail = req.params.orgEmail
    console.log("REQBODY", req.body);
    Organization.findOne({"email": orgEmail}, function(error, organization){
      if (error){
        console.log("Failed while finding organization", error);
      } else {
        var newEvent = new Event({
          organization: organization.name,
          attendees: [],
          location: req.body.location,
          time: req.body.time,
          picture: req.body.picture,
          description: req.body.description,
          name: req.body.name,
        })
        console.log("Work please")
        newEvent.save(function(error, success){
          if (error){
            console.log("Failed while saving new event", error);
            res.status(500).json({success: false});
          } else {
            console.log("Successfully saved new event");
            organization.upcoming.push(newEvent);
            organization.save();
            res.status(200).json({success: true});
          }
        })
      }
    })
  })
  router.get('/orgEvents/:orgName', function(req, res){
    var orgName = req.params.orgName
    Organization.findOne({"name": orgName}, function(error, events){
      if (error){
        console.log("Failed while finding events by organization name")
        res.status(500),json({success: false})
      } else {
        console.log("Successfully found organization's events", events);
        res.json(events);
      }
    })
  })
  router.get('/allEvents', function(req, res){
    Event.find({}, function(error, events){
      if (error){
        console.log("Failed while finding all events");
      } else {
        console.log('Backend events:', events)
        res.json(events);
      }
    })
  });
  router.post('/editVolProfile', function(req, res){
  });
  router.post('/editOrgProfile', function(req, res){
  });
  router.get('/allUsers', function(req, res){
    User.find({}, function(error, users){
      if (error){
        console.log("Failed while finding all users");
      } else{
        res.json(users);
      }
    })
  })

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
