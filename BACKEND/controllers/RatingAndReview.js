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

//get average rating  to display for a particular course
exports.getAverageRating=async(req,res)=>{
    try{
        //get course id
        const {courseId}=req.body

        //calculate average using aggregate avg of mongoose
        const result=await RatingAndReview.aggregate([
            {   //match with only those enrtries for which this is course id
                $match:{
                    course: new mongoose.Schema.Types.ObjectId(courseId)
                }
            },
            {   //using avg inside group key to find answer average
                $group:{
                    _id:null,
                    averageRating:{$avg: "$rating"}
                }
            }
        ])

        //if atleast 1 rating is given to course
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        //if no rating give to course as of now
        return res.status(200).json({
            success:true,
            averageRating:0,
            message:"no rating has been given to course as of now"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            averageRating:err.message,
            message:"error in finding avg of ratings"
        })
    }
}

//to get all the ratings/reviews  (list) for 1 course
exports.getAllRatingsForOneCourse=async (req,res)=>{
    try{
        //fetch course id
        const {courseId}=req.body
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"course id not present"
            })
        }

        //fetch the rating/reviews for a course
        const allRatingReviews=await RatingAndReview({course:courseId}).populate("user").populate("course").exec()

        if(!allRatingReviews){
            return res.status(400).json({
                success:false,
                message:"no rating/review for this course"
            })
        }
        return res.status(200).json({
            success:true,
            message:"fetched successfully",
            allRatingReviews
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"unable to fetch ratings/reviews"
        })
    }
}

//fetch all the ratings/reviews for any course all together
exports.getAllRatings=async (req,res)=>{
    try{
        //this alone would have been enough. but say i want them to get sort in descending order of rating
        //also we learned a way earlier of populating the inside parameteres of model. using select, heres new method we can use to:-
        const allRatingsReviews=await RatingAndReview.find({}).sort({rating:"desc"}).populate({
            path:"user",
            select:"firstName lastName email image"//insid euser only these will get populted not the rest
        }).populate({
            path:"course",
            select:"courseName"
        }).exec()


        return res.status(200).json({
            success:true,
            message:"Fetched successfully",
            allRatingsReviews
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant fetch error",
            error:err.message
        })
    }   
}