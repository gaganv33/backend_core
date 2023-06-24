const mongoose = require("mongoose")

const LoginSchema = new mongoose.Schema({
    userId : {type : String , required : true},
    token : {type : String , requried : true},
} , {timestamps : true});

LoginSchema.index({createdAt : 1} , {expireAfterSeconds : 86400});
module.exports = mongoose.model("Login" , LoginSchema)