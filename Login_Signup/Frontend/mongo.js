const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Login-signup')
.then(()=>{
    console.log("Database Connected")
})
.catch(()=>{
    console.log("Connection Failed")
})