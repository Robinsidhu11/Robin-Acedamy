const {instance}=require('../config/razorpay')

const User=require('../models/User')
const Course=require('../models/Course')

const mailsender=require('../utils/mailSender')
const courseEnrollmentEmail=require('../mailtemplates/courseEnrollmentEmail')
const { default: mongoose } = require('mongoose')

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