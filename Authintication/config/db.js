const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected.")
    } catch (error) {
        console.log("Database connection failed", error.message);
        process.exit(1);
    }
}
module.exports = connectDB