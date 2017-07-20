// Import Mongoose
var mongoose = require('mongoose')

// Define schema for Tasks
var EqtSchema = new mongoose.Schema({
	msg: {
    type: Object,
    required: [true, 'No msg provided!']
  }, place: {
    type: String,
  }
}, { timestamps: true })

// Create model from schema & associate variable to export to server
mongoose.model('Eqts', EqtSchema)

module.exports = mongoose.model('Eqts')