var express = require('express');


var router = express.Router();

function hashPassword(password){
  var hash = crypto.createHash('sha256') //Change this!!!
  hash.update(password);
  return hash.digest('hex');
}

module.exports = function(passport){
  return router;
};
