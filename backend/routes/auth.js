var express = require('express');


var router = express.Router();

function hashPassword(password){
  var hash = crypto.createHash('sha256') //Change this!!!
  hash.update(password);
  return hash.digest('hex');
}




module.exports = function(passport){
  // router.post('/login', function(req, res){
  //   var email = req.body.email;
  //   var password = req.body.password;
  //   User.find({email: email}, function(error, user){
  //     if (error){
  //       console.log("Failed while finding user");
  //     } else {
  //       if user.password
  //     }
  //   })
  // });
  return router;
};
