const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
  Firstname: {
    type: String
  },
  LastName:{
    type: String
  },
  Emailid: {
    type: String
  },
  Mobileno: {
    type: Number,
  },
  Address1: {
    type: String},
  Address2: {
    type: String},
  State: {
    type: String},

  Country:{
    type: String},
  Zipcode:{
    type: Number},
  CountryCode:{
    type: Number},
}, {
    collection: 'students'
  })

module.exports = mongoose.model('Student', studentSchema)