const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_CONN

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Database connected..');
    }).catch((error) => {
        console.log("Database connection failed:", error);
    })
module.exports = router;