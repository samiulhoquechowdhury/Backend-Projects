require('dotenv').config();
//async errors

const express = require('express')
const app = express();

const connectDB = require('./db/connect')


const notFoundMiddleware = require('./middleware/not-found')

const errorMiddleware = require('./middleware/error-handler')


//middleware
app.use('/', (req, res) => {
    res.send('<h1>Store API</h1> <a href="/api/v1/prods">Products routes</a>')
})

app.use('/api/v1/products',)

//product route

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port = process.env.PORT || 3000
const start = async () => {
    try {
        //connect db
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is starting listining on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start();