const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://samiulofficialworks:odtmh4WaLmXYxYg5@cluster0.rbv7y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("Database connected");
})
.catch(()=>{
    console.log('Connection Failed');
})


const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports=collection
