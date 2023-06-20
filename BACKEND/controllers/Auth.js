const User=require('../models/User')
const otp=require('../models/otp')
const otpgenerator=require('otp-generator')
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
        let checkOtp=await otp.findOne({otp:otpvalue})
        // as long we dont get unique otp, keep on generating otps (bad practice)
        while(checkOtp){
            otpvalue=otpgenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false
            })
            checkOtp=await otp.findOne({otp:otpvalue})
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

//Login

//changePassword
