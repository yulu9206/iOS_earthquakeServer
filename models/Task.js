'use strict';

// Import Mongoose
var mongoose = require('mongoose')

// Define schema for Tasks
var TaskSchema = new mongoose.Schema({
  objective: {
    type: String,
    required: [true, 'No task provided!']
  }
}, { timestamps: true })

// Create model from schema & associate variable to export to server
mongoose.model('Tasks', TaskSchema)

module.exports = mongoose.model('Tasks')


