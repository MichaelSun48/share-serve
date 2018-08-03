var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

mongoose.connect(connect);

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
  },
  bio: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  events: {
    type: Array,
    required: true,
  },
  role: {
    type: String,
    default: 'volunteer',
    required: true,
  }
})
var eventSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  attendees: {
    type: Array,
    required: true,
  },
  location: {
    type: String,
  },
  time: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
})

var organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  link: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  upcoming: {
    type: Array,
    required: true,
  },
  role: {
    type: 'String',
    default: 'organization',
    required: true
  }
})

var User = mongoose.model('User', userSchema);
var Event = mongoose.model('Event', eventSchema);
var Organization = mongoose.model('Organization', organizationSchema);

module.exports = {
  User: User,
  Event: Event,
  Organization: Organization
}
