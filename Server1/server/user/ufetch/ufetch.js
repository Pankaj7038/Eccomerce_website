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
router.get("/",(req, res)=>{
    //connect to mongodb
    mcl.connect(url,(err,conn)=>{
        if(err)
            console.log('Error in connection:- ',err)
        else{
            let db = conn.db("miniproject")
            db.collection('login_details').find().toArray((err, array)=>{
                if(err)
                    console.log(err)
                else{
                    console.log('Data sent')
                    res.json(array)
                    conn.close()
                }
            })
        }
    })
})
//User login Authentication
router.post("/", (req, res) => {
    //connect to mongodb
   // let uname_id = req.body.uname_id
    let username = req.body.username
    let upwd = req.body.upwd
    let obj = {username, upwd}    
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db("miniproject")
            db.collection('login_details').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    if (array.length > 0)
                        res.json({ 'auth': 'success', 'user': username })
                    else
                        res.json({ 'auth': 'failed' })
                    console.log('Auth response sent')
                    conn.close()
                }
            })
        }
    })
})
//export router
module.exports = router