const mongoose = require("mongoose")


const DiagnosisSchema = new mongoose.Schema({
    disease : {type : mongoose.Types.ObjectId , ref : "diseases"},
    report : {type : String , required : true},
    patient : {type : mongoose.Types.ObjectId , ref:"patients"}
})

module.exports = mongoose.model("diagnosis" , DiagnosisSchema)