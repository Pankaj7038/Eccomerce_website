//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.post("/", (req, res) => {
    let uname_id = req.body.uname_id
    let obj = {
        "username": req.body.username,
        "upwd": req.body.upwd
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniproject')
            db.collection('login_details').updateOne({ uname_id }, { $set: obj }, (err) => {
                if (err)
                    res.json({ 'update': 'Error ' + err })
                else {
                    console.log('Data updated')
                    res.json({ 'update': 'Success' })
                    conn.close()
                }
            })
        }
    })
})
//export router
module.exports = router