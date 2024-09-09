const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const port = process.env.PORT || 4000

const adminRoute = require('./routes/adminRoute')
const ordersRoute = require('./routes/ordersRoute')




//Activating cors middleware so we can make requests from the origin
app.use(cors())

//Accept json in req body
app.use(express.json())
app.use(cookieParser());


//All the routes
app.use('/api/admin', adminRoute)
app.use('/api/orders', ordersRoute)

app.get("/",(req,res)=>{
    res.status(200).send("This is ibuystore API")
})


//Connect to database and start listening
mongoose.connect(process.env.DB_URI).then(() => {
    app.listen(port, () => {
        console.log("Database is connected");
        console.log("Listening on Port", port);
    })
}).catch((err) => { console.log(err); })