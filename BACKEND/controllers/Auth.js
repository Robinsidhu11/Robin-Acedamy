const User=require('../models/User')
const Otp=require('../models/otp')
const otpgenerator=require('otp-generator')
const bcrypt=require('bcrypt')
const profile=require('../models/Profile')
const Profile = require('../models/Profile')
const jwt=require('jsonwebtoken')
const mailSender=require('../utils/mailSender')
require('dotenv').config()

//sendOTP (basically adds entry of otp in db which initiates the pre middleware and sens otp)
exports.sendOTP=async (req,res)=>{
    try{
        const {email}=req.body
        // check if email already exist in db ( although no need of doing this because we will be doing this at signup phase too)
        const isPresent=await User.findOne({email:email})
        if(isPresent){
            return res.status(401).json({
                success:false,
                message:"user already registered. go and login"
            })
        }

        //generate otp using otp generator
        let otpvalue=otpgenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        })
        

        //check if otp unique or not (check if already in otp collection or not . if not then add it to otp collection)
        let checkOtp=await Otp.findOne({otp:otpvalue})
        // as long we dont get unique otp, keep on generating otps (bad practice)
        while(checkOtp){
            otpvalue=otpgenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false
            })
            checkOtp=await Otp.findOne({otp:otpvalue})
        }
        console.log("OTP GENERATED IS ",otpvalue)

        //add otp to otp collection
        const response=await otp.create({email,otp:otpvalue})
        console.log("OTP Body is",response)

        //now this will get executed and returned only if pre middleware for otp should have worked perfectly. else we will go to catch
        return res.status(200).json({
            success:true,
            message:"otp sent successfully"
        })
  }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant send otp",
            error:err.message
        })
    }
}

//signUp
exports.signUp=async (req,res)=>{
    try{
        //fetch details from req body, and validate them
        const {email,firstName,lastName,password,confirmPassword,accountType,contactNumber,otp}=req.body
        //validate
        if(!email || !firstName || !lastName || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
        //if both password doesnt match
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password does not match"
            })
        }

        //check if user already exist before
        const isPresent=await User.findOne({email:email})
        if(isPresent){
            return res.status(400).json({
                success:false,
                message:"user already registered. go and login"
            })
        }

        //find most recent otp from db
        const recentOtp=await Otp.findOne({email}).sort({createdAt:-1}).limit(1)
        console.log("RECENT OTP IS ",recentOtp)

        //validate otp
        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:"Recent OTP found"
            })
        }
        else if(otp !== recentOtp.otp){
            return res.status(400).json({
                success:false,
                message:"otp doesnt match/ invalid otp"
            })
        }

        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        //create profile doc for this user
        const profile=await Profile.create({
            gender:null,
            about:null,
            dateOfBirth:null,
            contactNumber:null
        })
        //register user entry in db
        const response=await User.create({
            email,
            firstName,
            lastName,
            password:hashedPassword,
            accountType,
            //need to link profile doc here for this user
            additionalDetails:profile._id,
            // using api we can generate a profile pic from name of user
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:"user registered successfully",
            response
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant signup right now/ user cant be registered. please try again ",
            error:err.message
        })
    }

}

//Login
exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body
        //validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"fill all fields first"
              
            })
        }

        //check if email exist,if not ask user to signup first
        const isRegistered=await User.findOne({email:email}).populate("additionalDetails")
        if(! isRegistered){
            return res.status(400).json({
                success:false,
                message:"user is not registered. signup first"
              
            })
        }

        //validate passwords
        const passwordMatch=await bcrypt.compare(password,isRegistered.password)
        if(passwordMatch){
            //create jwt token and send it as a cookie too

            //creating jwt token
            const payload={
                email:isRegistered.email,
                role:isRegistered.role,
                id:isRegistered._id
            }
            const token=await jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            isRegistered.password=undefined
            isRegistered.token=token

            //create cookie and send response
            const options={
                //expiry date is for next 3 days
                expires: new Date(Date.now() + 3*24*60*60*1000),
                //so that user cant access it
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                message:"user logged in and token generated successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"password is incorrect",
               
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant login at the moment",
            error:err.message
        })
    }
}

//changePassword
exports.changePassword=async (req,res)=>{
    try{
        //get data from req body, old password,new password and confirm password
        const {oldPassword,newPassword,newConfirmPasword,email}=req.body

        //validates
        if(newPassword!==newConfirmPasword){
            return res.status(403).json({
                success:false,
                message:"new password and confirm password does not match"
            })
        }

        //check if user is registered
        const user=await User.findOne({email:email})
        //if user doesnt exist
        if(! user){
            return res.status(403).json({
                success:false,
                message:"user not registered"
            })
        }
        //check if old password is same as writen in db then update in db with new password
        if(await bcrypt.compare(oldPassword,user.password)){
            //hashpassword first
            const hashedPassword=await bcrypt.hash(newPassword,10)
            const response=await User.findOneAndUpdate(email,{password:hashedPassword})
            
            //send password changed mail to user
            await mailSender(email,"PASSWORD CHANGED SUCCESSFULLY","your password has been changed. congratulations")

            //return response
            return res.status(200).json({
                success:true,
                message:"password changed successfully",
                updatedUserDoc:response
            })
        }
        else{
            return res.status(403).json({
                success:false,
                message:"old password doesnt matches with your current password"
            })
        }


    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant change password for now",
            error:err.message
        })
    }
}