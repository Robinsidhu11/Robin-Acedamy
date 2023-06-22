const uploadImageToCloudinary=require('../utils/imageUploader')
const Tag=require('../models/Tags')
const user=require('../models/User')
const course=require('../models/Course')
const User = require('../models/User')
const Course = require('../models/Course')

const createCourse=async (req,res)=>{
    try{
        //fetch data
        const {courseName,courseDescription,whatYouWillLearn,price,tag}=req.body

        //fetch thumbnail
        const thumbnail=req.files.thumbnailImage

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }

        //now only instructor will be able to create the courses and all. we will handle this by auth middlewares.  also we also need instructor id to put in course schema model
        // we also sent payload also in req while doing authen and autorization. we can use that here to get id. refer to login controller and auth middleware
        const userId=req.user.id
        const instructorDetails=await User.findById({_id:userId})
        console.log("Instructor details: ",instructorDetails)

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"instructor details not found"
            })
        }

        //extra layer checking if tag is valid or not
        const tagDetails=await Tag.findById({tag})
        if(!tagDetails){
            return res.status(400).json({
                success:false,
                message:"Tag details not found"
            })
        }

        //upload thumbnail image to cloudinary
        const thumbnailUpoaded=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create entry in db for this course
        const newCourse=await course.create({
            courseName,
            courseDescription,
            price,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            tag:tagDetails._id,
            thumbnail:thumbnailUpoaded.secure_url
        })

        //remember for instructor, course refers to the courses hes teaching or taught. for student, course referes to courses he joined into

        //add course to user schema of instructor
        const updatedInsructorDetails=await User.findByIdAndUpdate(
            {_id:userId}
            ,{$push:{courses:newCourse._id}}
            ,{new:true}
            )
        
        //add course to tag schema too
        const updatedTagDetails=await Tag.findByIdAndUpdate(
            {_id:tagDetails.id},
            {
                $push:{Courses: newCourse._id}
            },
            {new:true}
        )
        
        return res.status(200).json({
            success:true,
            message:"course created successfully",
            data: updatedInsructorDetails
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant create course",
            error:err.message
        })
    }
}

const showAllCourses=async (req,res)=>{
    try{
        const allCourses=await Course.find({})

        return res.status(200).json({
            success:true,
            message:"all courses fetched successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant fetch courses",
            error:err.message
        })
    }
}