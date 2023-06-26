const mongoose = require("mongoose")

const DiseaseSchema = new mongoose.Schema({
    name : {type : String , required : true},
    image : {type : String},
    formData : {type : String}  //contains json string of diseases info
})

module.exports = mongoose.Model("diseases" , DiseaseSchema)