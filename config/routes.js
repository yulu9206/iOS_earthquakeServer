var express = require('express')
var router = express.Router()
var Eqt = require('../models/Eqt')

// Helper function responsible for fetching all Tasks

function getAllEqts(req, res){
  Eqt.find({}, function (err, eqts) {
    if (err) {
        console.log(err)
    } else {
        console.log(eqts)
        res.send(eqts)
        console.log ("db is trying to update data")
    }
  })
}
function addEqt(req, res){
  Eqt.create(req.body, function (err, eqts) {
    if (err) {
        console.error(`Error: ${error}`)
        res.send(`Error: ${error}`)
    } else {
        console.log(tasks)
        res.send(eqts)
        console.log ("db is trying to save data")
    }
  })
}

router.route('/eqts')
  .post(function (req, res) {
  /** 
  * Respond with all tasks stored on database if 'GET' request to route 
  * '/tasks'; the only time we send an error back to the client
  */
    console.log ("server is trying to save data")
    addEqt(req, res)
})
  

// router.route('/tasks/update/:_id')
//   .post(function (req, res) {
//   * 
//   * Respond with all tasks stored on database if 'GET' request to route 
//   * '/tasks'; the only time we send an error back to the client
  
//     console.log ("server is trying to update data")
//     updateTask(req, res)
// })
// router.route('/tasks/delete')
//   .post(function (req, res) {
//   * 
//   * Respond with all tasks stored on database if 'GET' request to route 
//   * '/tasks'; the only time we send an error back to the client
  
    
//     deleteTask(req, res)
//     console.log ("server is trying to delete data")
// })
router.route('/eqts')
  .get(function (req, res) {
  /** 
  * Respond with all tasks stored on database if 'GET' request to route 
  * '/tasks'; the only time we send an error back to the client
  */
    console.log ("server is trying to get data")
    getAllEqts(req, res)
  })
module.exports = router