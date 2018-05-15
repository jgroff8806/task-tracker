var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var task = new Schema({
  task: String,
  description: String,
  created: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("TaskModel", task);
