const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    email : {type : String , required : true},
    username : {type : String , required : true},
    password : {type : String , required  : true},
    isActive : {type : Boolean , default : true},
    roleType : {type : "String" , default : "PATIENT"}
})

module.exports = mongoose.model("User" , UserSchema)