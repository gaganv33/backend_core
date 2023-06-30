const express = require("express")
const {authenticateRequest, isDoctor} = require("../middleware/auth")
const Doctor = require("../models/Doctor")
const User = require("../models/User");
const Diseases = require("../models/Diseases");
const router = express.Router();

router.get("/allUsers" , async (req , res ,next)=>{
    try{
        const users = await User.find({})
        return res.status(200).json({users})
    }catch(err){
        next(err)
    }
})
router.post("/addPatient/:user_id" , authenticateRequest , isDoctor , async(req , res , next)=>{
    try{
        const DoctorData = await Doctor.findById(req.user.DoctorData);
        if(!DoctorData) return res.status(500).json({err : "Something went wrong, doctor does not exist"});
        const PatientData = await User.findById(req.params.user_id)
        if(!PatientData) return res.status(404).json({err : "Patient not found"})
        DoctorData.patients.push(PatientData._id);
        await DoctorData.save();
        return res.status(200).json({msg : "Patient added successfully"});
    }catch(err){
        next(err)
    }
})

router.get("/patients/" , authenticateRequest , isDoctor , async (req , res , next)=>{
    try{
        console.log(req.user)
        const doctorData = await Doctor.findById(req.user.DoctorData).populate("patients");
        return res.status(200).json({patients : doctorData.patients});
    }catch(err){
        next(err)
    }
})

router.post("/addDisease" , authenticateRequest , isDoctor , async(req , res , next)=>{
    try{
        if(!req.body.diseaseName) return res.status(400).json({err : "Please provide the disease name"});
        const newDisease = await Diseases.create({name : req.body.diseaseName})
        // const currentDoc = await Doctor.findById(req.user.DoctorData)
        // currentDoc.diseasePriority.push(newDisease._id);//setting new disease priority to be the last
        res.status(200).json({msg : "Disease has been added"})
    }catch(err){
        next(err)
    }
})

router.get("/diseases" , authenticateRequest , isDoctor , async(req , res , next)=>{
    try{
        const diseases = await Diseases.find({});
        return res.status(200).json({diseases});
    }catch(err){
        next(err)
    }
})

router.get("/diseases/prio" , authenticateRequest , isDoctor , async(req , res , next)=>{
    try{
        const doctorData = await Doctor.findById(req.user.doctorData);
        if(!doctorData) return res.status(404).json({err : "Doctor data is not found"});
        return res.status(200).json({priority : doctorData.diseasePriority});
    }catch(err){
        next(err)
    }
})

router.patch("/diseases/prio" , authenticateRequest , isDoctor , async(req , res , next)=>{
    try{
        const doctorData = await Doctor.findById(req.user.doctorData);
        if(!doctorData) return res.status(404).json({err : "Doctor data is not found"});
        doctorData.diseasePriority = req.body.priorities;
        await doctorData.save();
        return res.status(200).json({msg : "Priority saved"})
    }catch(err){
        next(err)
    }
})

module.exports = router