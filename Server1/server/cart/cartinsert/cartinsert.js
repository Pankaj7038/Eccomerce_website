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
    let obj = {
        "cart_id": req.body.cart_id,
        "uname_id": req.body.uname_id,
        "username":req.body.username,
        "p_id": req.body.p_id,
        "p_name":req.body.p_name,
        "p_model":req.body.p_model,
        "p_cost":req.body.p_cost,
        "p_desc":req.body.p_desc,
        "img":req.body.img
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniproject')
            db.collection('cart').insertOne(obj,(err)=>{
                if(err)
                    res.json({'insert':'Error '+err})
                else{
                    console.log('Data inserted')
                    res.json({'insert':'Success'})
                    conn.close()
                }
            })
        }
    })
})
//export router
module.exports = router