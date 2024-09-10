require('dotenv').config();
const express = require('express')

const app = express();

const PORT = process.env.PORT || 8080

app.use('/', (req, res) => {
    res.send('Hello, from server')
})

app.listen(PORT, ()=>{
    console.log(`Server is listining at port ${PORT}`)
})