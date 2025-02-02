const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name , it is required']
    },
    email:{
        type:String,
        required:[true,'Please enter your email , it is required']
    },

    password:{
        type:String,
        required:[true,'Please enter your password , it is required']
    },
    isAdmin:{
        type : Boolean,
        default : false
    },
    isProfessor:{
        type : Boolean,
        default : false
    },
    notification:{
        type:Array,
        default:[]
    },
    seenNotification:{
        type:Array,
        default:[]
    },
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;