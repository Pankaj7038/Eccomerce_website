//import modules express body-parser cors
let express = require('express')
let bodyparser = require('body-parser')
let cors = require('cors')
//create rest object
let app = express()
//set JSON as MIME type
app.use(bodyparser.json())
//client is not sending form data -> encoding JSON
app.use(bodyparser.urlencoded({ extended: false }))
//enable CORS -> Cross Origine Resource Sharing -> communication among various ports
app.use(cors())
//import fetch insert update delete product

let fetch = require('./product/profetch/profetch')
let insert = require('./product/proinsert/proinsert')
let update = require('./product/proupdate/proupdate')
let remov = require('./product/prodelete/prodelete')

//use above product
app.use('/profetch', fetch)
app.use('/proinsert', insert)
app.use('/proupdate', update)
app.use('/prodelete', remov)



// //import fetch insert update delete from cart

let fetch3 = require('./cart/cartfetch/cartfetch')
let insert3 = require('./cart/cartinsert/cartinsert')
let update3 = require('./cart/cartupdate/cartupdate')
let remov3 = require('./cart/cartdelete/cartdelete')

//use above from cart

app.use('/cartfetch',fetch3)
app.use('/cartinsert', insert3)
app.use('/cartupdate', update3)
app.use('/cartdelete', remov3)

// // //import fetch insert update delete user
let fetch5 = require('./user/ufetch/ufetch')
let insert5 = require('./user/uinsert/uinsert')
let update5 = require('./user/uupdate/uupdate')
let remov5 = require('./user/udelete/udelete')

//use above user
app.use('/ufetch', fetch5)
app.use('/uinsert', insert5)
app.use('/uupdate', update5)
app.use('/udelete', remov5)

//assign port no
app.listen(5001)
console.log('Server listening port no 5001')
/*
>node server
Test following URLs with postman
http://localhost:8080/fetch (get)
http://localhost:8080/insert |
http://localhost:8080/update |(post)
http://localhost:8080/delete |
body -> raw -> json
*/