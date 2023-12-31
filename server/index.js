const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const router = require('./routes/routes')


app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
}))

app.use(cookieParser())
app.use(express.json())
app.use("/api",router)

mongoose.connect("mongodb://localhost:27017/jwtproject",{
    useNewUrlParser : true,
    // useUnifiedToplogy : true
})
.then(() => {
    console.log("connected to database")

    app.listen(5000,() => { 
        console.log("App is listening on port 5000")
    })
})