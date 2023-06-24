const Course=require('../models/Course')
const Section=require('../models/Section')

//to create a section
exports.createSection= async (req,res)=>{
    try{
        //data fetch. say we do from body
        const {sectionName,courseID}=req.body

        //validate
        if(!sectionName || !courseID){
            return res.status(400).json({
                success:false,
                message:"section name and course id should be passed"
            })
        }

        //add section entry in db
        const newSection=await Section.create({sectionName});

        //update the course content inside the course model
        const updatedCourse=await Course.findByIdAndUpdate(
            {_id:courseID},
            {$push: {courseContent:newSection._id}},
            {
                new:true
            }).populate("courseContent")
            //pending also we need to populate subsections too inside this course content TODO

        return res.status(200).json({
            success:true,
            message:"section created successfully",
            updatedCourse
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"section cant be created",
            error:err.message
        })
    }
}

//update the section
exports.updateSection=async (req,res)=>{
    try{
        //fetch data (say section name we get which we want to update with and section id)
        const {sectionName,sectionId}=req.body

        //validate
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"section new name and section id is required"
            })
        }

        //update the section
        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},{sectionName},{new:true})

        return res.status(200).json({
            success:true,
            message:"section updated successfully",
            updatedSection
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"section cant be updated",
            error:err.message
        })
    }
}
//delete the section
exports.deleteSection=async (req,res)=>{
    try{
        //fetch section id (say this time we get it from params)
        const sectionId=req.params
        const courseID=req.body //REQ TO DELETE THE SECTION ID FROM COURSE CONTENT IN COURSE

        //validate

        if(!sectionId || !courseID){
            return res.status(400).json({
                success:false,
                message:"courseid and section id is required"
            })
        }

        //delete it from section and also delete section id from course content in course
        const deletedSection=await Section.findByIdAndDelete({_id:sectionId})

        const updatedCourse=await Course.findByIdAndUpdate(
            {_id:courseID},
            {$pull: {courseContent:sectionId}},
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"section deleted successfully",
            deletedSection:deletedSection,
            updatedCourse:updatedCourse
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"section cant be deleted",
            error:err.message
        })
    }
}