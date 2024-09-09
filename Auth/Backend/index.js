require('dotenv').config()
require('./Models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080


app.get('/ping', (req, res) =>{
    res.send("Pong")
})

app.use(bodyParser.json())
app.use(cors())
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})