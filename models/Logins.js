const mongoose = require("mongoose")

const LoginSchema = new mongoose.Schema({
    userId : {type : String , required : true},
    token : {type : String , requried : true},
} , {timestamps : true});

module.exports = mongoose.model("Login" , LoginSchema)