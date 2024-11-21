const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log(e);
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})



const order=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    items:{
        type: [
            {
                name: String,
                price: Number
            }
        ],
        required:true
    },
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)
const OrderCollection=new mongoose.model('OrderCollection',order)

module.exports={LogInCollection,OrderCollection}