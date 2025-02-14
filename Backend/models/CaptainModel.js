const mongoose=require('mongoose');

const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'Firstname must be at least 3 charecter long']
        },
        lastname:{
            type:String,
            required:true,
            minLength:[3,'lastname must be at least 3 charecter long']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3,'Color must be at least 3 charecter']
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,'plate must be at least 3 charecter']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be at least 1']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto']
        }
    },
    location:{
        ltd:{
            type:Number
        },
        lng:{
            type:Number
        }
    }
})

module.exports=mongoose.model("captainModel",captainSchema);