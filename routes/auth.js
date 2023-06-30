// const mongoose = require("mongoose");
const express = require('express');
const User = require("../models/User")
const Login = require("../models/Logins")
const crypto = require("crypto")
const bcrypt = require("bcryptjs");
const { authenticateRequest } = require('../middleware/auth');
const Logins = require('../models/Logins');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const router = express.Router()

router.post("/register" , async (req , res , next)=>{
    try{
        const {email , username , password} = req.body;
        const {roleType} = req.query
        if(!username || !password || !email) return res.status(403).json({error : "Email or password missing"})
        const foundUser = await User.find({email});
        if (foundUser.length > 0) return res.status(409).json({error : "Email is already taken"})
        const salt =  await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password , salt);
        const newUser = await User.create({...req.body , roleType})
        if(newUser.roleType == 'DOCTOR'){
            const newDoc = await Doctor.create({});
            newUser.DoctorData = newDoc._id;
            await newUser.save();
        }
        const newPatient = await Patient.create({});
        newUser.PatientData = newPatient._id;
        await newUser.save();
        res.status(200).json({user : newUser , msg : "Registered successfully. Please Login"})
    }catch(err){
        next(err)
    }
})

router.post("/login" , async(req , res , next)=>{
    try{
        const {email , password} = req.body;
        const foundUser = await User.findOne({email});
        if(!foundUser) return res.status(404).json({err : "User not found"});
        if(!bcrypt.compareSync(password , foundUser.password)) return res.status(403).json({err : "Passwords dont match"});
        const token = crypto.randomBytes(64).toString('hex');
        await Login.create({
            userId : foundUser._id,
            token : token
        })

        res.cookie("auth_tkn" , token , {
            expiresIn : 1000 * 86400 ,   // 24 hours
            httpOnly : true,
            sameSite : "strict"
        })
        res.status(200).json({msg : "Login completed"})

    }catch(err){
        next(err)
    }
})

router.get("/protected" , authenticateRequest , async(req , res , next)=>{
    res.send("Hello from protected resource");
})

router.patch("/logout" , async(req , res , next)=>{
    try{
        if(!req.cookies.auth_tkn) return res.status(401).json({err : "You need to login to access this resource"});
        await Logins.findOneAndDelete({token : req.cookies.auth_tkn});
        res.clearCookie("auth_tkn" , {
            expiresIn : 1000 * 86400 ,   // 24 hours
            httpOnly : true,
            sameSite : "strict"
        })
        return res.status(200).json({msg : "You are logged out"});
    }catch(err){
        next(err)
    }
})

module.exports = router

