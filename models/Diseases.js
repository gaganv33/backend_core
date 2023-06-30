const mongoose = require("mongoose")

const DiseaseSchema = new mongoose.Schema({
    name : {type : String , required : true}
})

module.exports = mongoose.model("diseases" , DiseaseSchema)