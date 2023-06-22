const Section=require('../models/Section')
const SubSection=require('../models/SubSection')
const uploadImageToCloudinary=require('../utils/imageUploader')
//create sub section


exports.createSubSection=async (req,res)=>{
    try{
        //fetch data from req body
        const {title,timeDuration,description,sectionID}=req.body
        //fetch video 
        const videofile=req.files.VideoFile 

        //validate
        if(!title || !timeDuration || !description || !sectionID || !videofile){
            return res.status(400).json({
                success:false,
                message:"all fields are required."
            })
        }

        //upload video to cloudinary
        const uploadDetails=await uploadImageToCloudinary(videofile,process.env.FOLDER_NAME)

        //create subsection
        const newSubSection=await SubSection.create({title,timeDuration,description,videoUrl:uploadDetails.secure_url})

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
            message:"cant create sub section right now"
        })
    }
}