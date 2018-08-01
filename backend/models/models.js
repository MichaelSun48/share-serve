import mongoose from 'mongoose';
var connect = process.env.MONGODB_URI;

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  upcoming: {
    type:
  }
})
