const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        trim:true
    },
    courseDescription:{
        type:String,
        
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    whatYouWillLearn:{
        type:String,
        trim:true
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview",
        }
    ],
    price:{
        type:Number,
        trim:true
    },
    thumbnail:{
        type:String,
    },
    studentsEnrolled: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    countOfStudentsEnrolled:{
        type:Number,
        default:0
    },
    tag:{
        type:String,
        required:true
    },
    status: {
		type: String,
		enum: ["Draft", "Published"],
	}
})

module.exports=mongoose.model("Course",courseSchema)