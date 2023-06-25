const mongoose=require('mongoose')
const mailSender=require('../utils/mailSender')
const otpTemplate=require('../mailtemplates/emailVerificationTemplate')
const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    otp: {
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60
    }
})

//pre middleware to initiate the email with otp to user (will only run whenever we create entry in db for OTP collection , just before making entry in db this pre middleware will run)
// VIP: here dont create arrow fn as callback inside, becuse we cant access this keyword in arrow fn. so we made a nomral fn
otpSchema.pre("save",async function (next){
    try{
        //this keyword is used to fetch properties of the current document for which this fn mailsender is getting called
        const info=await mailSender(this.email,"OTP VERIFICATION MAIL",otpTemplate(this.otp))
        console.log("Mail sent successfully",info)
    }
    catch(err){
        console.log("Mail not sent, this error occured-> ",err.message)
    }
})


module.exports=mongoose.model("Otp",otpSchema)