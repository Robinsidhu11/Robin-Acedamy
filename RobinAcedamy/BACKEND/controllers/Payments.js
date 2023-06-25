const {instance}=require('../config/razorpay')

const User=require('../models/User')
const Course=require('../models/Course')

const courseEnrollmentEmail=require('../mailtemplates/courseEnrollmentEmail')
const { default: mongoose } = require('mongoose')
const mailSender = require('../utils/mailSender')

//controller to validate user and course, create & initiate payment.
exports.capturePayment=async (req,res)=>{
    try{
        //get user id and course id
        const userid=req.user.userid
        const {courseId}=req.body

        //validate 
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"pls provide valid course id"
            })
        }
        if(!userid){
            return res.status(400).json({
                success:false,
                message:"pls provide valid user id"
            })
        }

        //validate course details
        const courseDetails=await Course.find({_id:courseId})
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Following course doesnt exist in DB"
            })
        }

        //verify whether user already bought this course or not (in course there is studentsEnrolled , check if userid is present in that array or not)
        //now userid we have is in form of string but in course/studentenrolled ids are present, are in type of object ids.

        // so we will convert our userid into object id making it easy for us to to match

        const uid=new mongoose.Schema.Types.ObjectId(userid)
        if(courseDetails.studentsEnrolled.includes(uid)){
            return res.status(400).json({
                success:false,
                message:"you are already enrolled in course. why buying same again"
            })
        }

        //all validations seems done 

        //creating order
        const amount=courseDetails.price;
        const currency="INR"
        const options={
            amount:amount*100,//mandatory
            currency,//mandatory
            receipt: Math.random(Date.now()).toString(), //optional
            notes:{
                courseId:courseId,
                userid
            }//optional
        }

        //initiate payment
        try{
            const paymentResponse=await instance.orders.create(options)
            console.log(paymentResponse) 
            return res.status(200).json({
                success:false,
                courseName:courseDetails.courseName,
                courseDescription:courseDetails.courseDescription,
                thumbail:courseDetails.thumbail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount,
                message:"payment initiation done"
            })
        }
        catch(err){
            return res.status(400).json({
                success:false,
                message:"cant initiate payment"
            })
        }

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant create payment order for now",
            error:err.message
        })
    }
}

//controller to verify payment
//verify signature secret of razorpay and server
//remember this controller will be initiated by razorpay not our request
exports.verifySignature=async (req,res)=>{
    //our intend is, we getting a our key in encrypted form from the razorpay (called signature), we have secret stored at out server too. called webhookSecret. so we cant decrypt that signature and match with webhook secret rather we can do is encrypt our webhooksecret using same encrypt algos that razorpay used to encrypt secret.
    //and then we can match our encrypted thing to the signature received from webhook

    //say webhook (secret we have given earlier to razorpay)
    const webhookSecret="12345678"

    
    //fetching signature sent from razorpay
    const signature=req.headers("x-razorpay-signature")

    //first param is algo, second is secret
    const shasum=crypto.createHmac("sha256",webhookSecret)
    shasum.update(JSON.stringify(req.body))
    const digest=shasum.digest("hex")

    //matching signature and our encrypted key
    if(signature==digest){
        console.log("payment is authorized")
        //as this controller was called by RAZORPAY SO WE CANT NOW ACCESS THE COURSE AND SUER ID FROM REQ BODY. BUT WE DO PASSED THOSE IN OPTIONS WHILE CREATING Order. so we can acess through that
        const {courseId,userid}=req.body.payload.payment.entity.notes;

        //we need to update course in users array and also in course model inside student enrolled we need to update there too
    try{
        const updatedCourseDetails=await Course.findByIdAndUpdate({_id:courseId},{$push:{studentsEnrolled:userid}},{new:true})
        if(!updatedCourseDetails){
            return res.status(400).json({
                success:false,
                message:"course not found"
            })
        }
        //update the total enrolled cunt too in course
        let currentEnrolledCount=updatedCourseDetails.countOfStudentsEnrolled
        currentEnrolledCount=currentEnrolledCount+1
        const againUpdatedCourseDetails=await Course.findByIdAndUpdate({_id:courseId},{countOfStudentsEnrolled:currentEnrolledCount})

        //find user and update there too
        const updatedUserDetails=await User.findByIdAndUpdate({_id:userid},{$push:{courses:courseId}},{new:true})

        //mailsend for cnfirmation to user
        //TDOD: ATTACH TEMPLATE TOO FOR COURSE ENROLLMENT
        const emailResponse=await mailSender(updatedUserDetails.email,"Congrats enrolled","Congratulations you are on boarded into new course")
        
        return res.status(200).json({
            success:true,
            message:"Signature verified and Course purchased sucessfully"
        })
        }
    catch(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"invalid request"
        })
    }
}