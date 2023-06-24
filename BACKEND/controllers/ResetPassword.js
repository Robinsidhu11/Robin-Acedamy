const bcrypt=require('bcrypt')
const User=require('../models/User')
const mailsender=require('../utils/mailSender')
//resetPasswordToken just create and send link in a mail to user. also adds this token and its expiry in user's body schema too
exports.resetPasswordTokenCreate=async (req,res)=>{
    try{
        //get email from req body
        const email=req.body.email
        //check user for this email, email validation
        if(!email){
            return res.status(403).json({
                success:false,
                message:"email doesn't exist"
            })
        }
        //if no user exist in db
        const user=await User.findOne({email:email})
        if(! user){
            return res.status(403).json({
                success:false,
                message:"this email is not registered. please sign up"
            })
        }
        //generate token using inbuilt crypto library
        const token=crypto.randomUUID();
        //update user with resetPasswordToken and resetPasswordTokenExpiry
        const updatedUser=await User.findOneAndUpdate({email:email},{
            resetPasswordToken:token,
            //expiry time 5 minute in milliseconds
            resetPasswordTokenExpiry:Date.now() + 5*60*1000
        },{new:true})
        
        //create url to bent to user in email
        const url=`https://localhost:3000/update-password/${token}`

        //send email
        await mailsender(email,"Reset Password mail",`Reset Password Link: ${url}`)
        return res.status(200).json({
            success:true,
            message:"reset link sent through email successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant send reset mail, oops",
            error:err.message
        })
    }
}

//resetPassword (when user will submit password and confirm password this will get executed. validate and then update the password)
exports.resetPasswordFn=async (req,res)=>{
    try{    
        //thats why we passed reset token in user schema. because now we will be able to track that user by using reset token. which ever user clicks on that link
        const {token,password,confirmPassword}=req.body
        //if passwords dont match
        if(password!==confirmPassword){
            return res.status(403).json({
                success:false,
                message:"password and confirm password does not match. try again"
            })
        }

        //get userdetails using token
        const user=await User.findOne({resetPasswordToken:token})

        //if no entry ,  say invalid token
        if(!user){
            return res.status(403).json({
                success:false,
                message:"no user corresponds to this token. invalid token, try again"
            })
        }

        //check expiry
        //if it expires
        if(user.resetPasswordTokenExpiry < Date.now()){
            return res.status(403).json({
                success:false,
                message:"token expired oops"
            })
        }

        //hash password & update in db
        const hashedPassword=await bcrypt.hash(password,10)
        const updatedUser=await User.findOneAndUpdate({resetPasswordToken:token},{password:hashedPassword},{new:true})

        return res.status(200).json({
            success:true,
            message:"passoword set successfully. congrats"
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"passoword reset failed",
            error:err.message
        })
    }
}
