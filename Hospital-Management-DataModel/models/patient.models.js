import mongoose from 'mongoose'

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },    
    age: {
        type: Number,
        required: true
    },    
    bloGroup: {
        type: String,
        required: true
    },    
    diagnosedWith: {
        type: String,
        required: true
    },    
    adress: {
        type: String,
        required: true
    }    
},{timestamps:true})

export const Patient  = mongoose.model('Patient', patientSchema);