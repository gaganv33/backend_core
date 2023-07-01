const mongoose = require("mongoose")

const DiseaseSchema = new mongoose.Schema({
    name : {type : String , required : true},
    priority : {type : Number , required : true , unique : true}
})

module.exports = mongoose.model("diseases" , DiseaseSchema)