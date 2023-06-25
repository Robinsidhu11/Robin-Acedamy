const Section=require('../models/Section')
const SubSection=require('../models/SubSection')
const {uploadImageToCloudinary}=require('../utils/imageUploader')

//create sub section
exports.createSubSection=async (req,res)=>{
    try{
        //fetch data from req body
        const {title,description,sectionID}=req.body
        //fetch video 
        const videofile=req.files.VideoFile 

        //validate
        if(!title || !description || !sectionID || !videofile){
            return res.status(400).json({
                success:false,
                message:"all fields are required."
            })
        }
           
        //upload video to cloudinary
        const uploadDetails=await uploadImageToCloudinary(videofile,process.env.FOLDER_NAME_COURSESVIDEOS)
        
        //create subsection
        const newSubSection=await SubSection.create({title,description,videoUrl:uploadDetails.secure_url,timeDuration:`${uploadDetails.duration}`})
        
        //update the section now with id of above created subsection
        const updatedSection=await Section.findByIdAndUpdate(
            {_id:sectionID},
            {$push:{subSection:newSubSection._id}},
            {new:true}
        ).populate("subSection").exec()
        
        return res.status(200).json({
            success:true,
            message:"Subsection created successfully",
            subSectionCreatedIs:newSubSection,
            updatedSection:updatedSection
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant create sub section right now",
            error:err.message
        })
    }
}

//update subsection
exports.updateSubSection=async(req,res)=>{
    try{
        //fetch data from req body input
        const {title,description,sectionID,subSectionId}=req.body
        
        //fetch that subsection 
        const subSection=await SubSection.findById(({_id:subSectionId}))

        //fetch video 
        const videofile=req.files.VideoFile 
        //if video file is passed then update its url. else this wont run
        if(videofile){
            //upload video to cloudinary
            const uploadDetails=await uploadImageToCloudinary(videofile,process.env.FOLDER_NAME_COURSESVIDEOS)
            subSection.videoUrl=uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }
        //if title is passed then update its url. else this wont run
        if(title){
            subSection.title=title
        }
        //if description is passed then update its url. else this wont run
        if(description){
            subSection.description=description
        }
        //nothing is sent by user for updation
        if(!videofile || !title || !description){
            return res.status(400).json({
                success:false,
                message:"atleast send data of one of them. to update"
            })
        }

        //save subsection
        await subSection.save()

        return res.json({
            success: true,
            message: "SubSection updated successfully",
          })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"can't update Sub section right now"
        })
    }
}

//delete subsection
exports.deleteSubSection=async (req,res)=>{
    try{
        //fetch subsectionID
        const {subSectionId,sectionID}=req.body

        //delete it from sub section collections
        const deletedSubSection=await SubSection.findByIdAndDelete({_id:subSectionId})

        //delete it from section model,in there from subsection
        const updatedSection=await Section.findByIdAndUpdate({_id:sectionID},{$pull: {subSection:subSectionId}},{new:true})

        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
          })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant delete subsection",
            error:err.message
        })
    }
}