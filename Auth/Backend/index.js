require('dotenv').config()
require('./Models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()
const AuthRouter = require('./Routes/AuthRouter')
const PORT = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(cors())
app.use('/auth',AuthRouter)

app.use('/about', (req, res) =>{
    res.send("This is a about")
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})
///video : 27:43