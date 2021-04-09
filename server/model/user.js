const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                 throw new Error("email is invalid!")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password'))
            throw new Error('Password cannot be "password"!')
        }
    },
    age:{
        type: Number,
        validate(value){
            if(value<0){
                throw new Error('Age must be grater than 0')
            }
        }
    },
    gender:{
        type:String,
        trim:true
    }
},
{
    timestamps:true
})

//creating model of moongoose and then creating an instance of model and then saving it
const User = mongoose.model('User',userSchema)

module.exports = User