const RatingAndReview=require('../models/RatingAndReview')
const Course=require('../models/Course')
const { default: mongoose } = require('mongoose')

//create rating and review handler in one go 
exports.createRating=async (req,res)=>{
    try{
        //we need course id, rating and review from req
        const {courseId,rating,review}=req.body
        //get user id 
        const userid=req.user.id

        //user must be enrolled in that particular course. check it

        //method 1 we have already seen this before too
        const courseDetails=await Course.findById({_id:courseId})
        const uid=new mongoose.Schema.Types.ObjectId(userid)
        if(! courseDetails.studentsEnrolled.includes(uid)){
            return res.status(400).json({
                success:false,
                message:"you are not enrolled in this course"
            })
        }
        //method2
        // const courseDetails=await Course.findById(
        //     {_id:courseId,
        //      studentsEnrolled:{$elemMatch:{$eq: userid}}
        // })
        // if(!courseDetails){
        //     return res.status(400).json({
        //         success:false,
        //         message:"you are not enrolled in this course"
        //     })
        // }


        //only 1 rating- review must be allowed from one user. check this too
        const isAlreadyReviewed=await RatingAndReview.find({course:courseId,user:userid})
        if(isAlreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"you have already given rating/review"
            })
        }

        //create rating and review in db
        const obj=new RatingAndReview({
            user:userid,
            rating:rating,
            review:review,
            course:courseId
        })
        const newRatingReview=await obj.save()

        //add this into articular course too
        const updatedCourse=await Course.findByIdAndUpdate({_id:courseId},{$push:{ratingAndReviews:newRatingReview}},{new:true})

        return res.status.json({
            success:true,
            message:"rating/review created successfully",
            newRatingReview
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant create your rating/review at the momemt",
            error:err.message
        })
    }
}