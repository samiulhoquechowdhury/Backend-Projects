const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: t
    },
    password: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model('UserModel', UserSchema)
module.exports = UserModel