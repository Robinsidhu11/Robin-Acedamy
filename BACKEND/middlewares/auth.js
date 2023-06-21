const jwt=require('jsonwebtoken')
const User=require('../models/User')
require('dotenv').config()
//authenticate
exports.authenticate=async (req,res,next)=>{
    try{
        //fetch token
        const token= req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
        
        //if token is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token is missing"
            })
        }

        try{
            //verify token using secret using sign method which will give me the payload i made while creating token
        const decodedPayload=await jwt.verify(token,process.env.JWT_SECRET)
        console.log("DECODED PAYLOAD IS ",decodedPayload)
        
        //add this decoded payload inside the req for next middlewares to access too
        req.user=decodedPayload
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"token is invalid/expired"
            })
        }
        next()
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant authenticate for now/ something went wrong",
            error:err.message
        })
    }
}

//isStudent
exports.isStudent=async (req,res,next)=>{
    try{
        //get role
        if(req.user.accountType !=="Student"){
            return res.status(401).json({
                success:false,
                message:"you are not student. so you cant access route defined for students only"
            })
        }
        next() 
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant verify your role (authorization failed). some error ",
            error:err.message
        })
    }
}

//isInstructor
exports.isInstructor=async (req,res,next)=>{
    try{
        //get role
        if(req.user.accountType !=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"you are not Instructor. so you cant access route defined for Instructor only"
            })
        }
        next() 
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant verify your role (authorization failed). some error ",
            error:err.message
        })
    }
}

//isAdmin
exports.isAdmin=async (req,res,next)=>{
    try{
        //get role
        if(req.user.accountType !=="Admin"){
            return res.status(401).json({
                success:false,
                message:"you are not Admin. so you cant access route defined for Admin only"
            })
        }
        next() 
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant verify your role (authorization failed). some error ",
            error:err.message
        })
    }
}