const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'First name must be at least 2 characters']
        },
        lastname:{
            type:String,
            minLength:[3,'Last name must be at least 3 characters']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:[5,'Email must be at least 5 characters']
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,
    }
})

module.exports=mongoose.model("User",userSchema);