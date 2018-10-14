const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  description: String,
  isComplete: Boolean,
});

module.exports = mongoose.model('Task', taskSchema);