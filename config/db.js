
'use strict';

var mongoose = require('mongoose')
var db = mongoose.connection

var connection = (function (){
    mongoose.connect('mongodb://localhost:27017/eqts')
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', console.info.bind(console, "Connected to database"))
})()

module.exports = connection