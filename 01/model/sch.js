const mongoose = require('mongoose');

const task = new mongoose.Schema({
  id:Number,
  title:String,
  status:Boolean,
  time:{type:String,default:new Date()},
})

module.exports = mongoose.model('task',task)





