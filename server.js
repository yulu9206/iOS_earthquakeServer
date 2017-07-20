

'use strict';

// Require ExpressJS (server) & body-parser (Convert request 
// body to JSON) modules from node_modules
var express = require('express')
var bodyParser = require('body-parser')
var Eqt = require('./models/Eqt')
// Require user-created database configuration module 
// & application routes module
var database = require('./config/db')
var routes = require('./config/routes')
// Create instance of Express server
var app = express()
app.get('/', function(req, res) {
	res.send('hello');
})
// Supply body-parser as middleware
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

// Define routes
app.use('/', routes)

// Start server which is listening for requests on port 8000
app.listen('8000', function () {
  console.info('Listening on 8000')
})

// API call
var publishLoop  = function() {
	var RTM = require("satori-rtm-sdk");

	var endpoint = "wss://open-data.api.satori.com";
	var appKey = "34F7F1Dc5e2B3d384DDABF2ab48CA04e";
	var channel = "USGS-Earthquakes";

	var client = new RTM(endpoint, appKey);

	client.on('enter-connected', function () {
	  console.log('Connected to Satori RTM!');
	});

	var subscription = client.subscribe(channel, RTM.SubscriptionMode.SIMPLE);

	subscription.on('rtm/subscription/data', function (pdu) {
	  pdu.body.messages.forEach(function (data) {
	  	Eqt.update({ place: data.properties.place }, {msg: data, place: data.properties.place} , {upsert:true}, function (err,tasks) {
	  	  if (err) {
	  	      console.log(err)
	  	  } else {
	  	      console.log ("db is trying to update data", tasks)
	  	  }
	  	})
	  	// var quake = new Eqt({msg: data});
	  	// quake.save(function(err){
	  	// 	if (err) {
	  	// 		return err;
	  	// 	} else {
	  	// 		console.log("quake saved")
	  	// 		console.log(quake)
	  	// 	}
	  	// })
	  });
	});
client.start();
}

setInterval(publishLoop, 1800000);
//db add function
