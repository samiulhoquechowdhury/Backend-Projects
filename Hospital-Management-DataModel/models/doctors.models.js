import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true
    }
},{timestamps:true})

export const Doctor = mongoose.moodel("Doctor", doctorSchema);