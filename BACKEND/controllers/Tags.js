const Tag=require('../models/Tags')

//to create a tag (only for admin to access)
exports.createTag=async (req,res)=>{
    try{
        //get data from body
        const {name,description}=req.body
        // validate
        if(!name || !description){
            return res.status(403).json({
                success:false,
                message:"fill name and description carefully",
            })
        }

        //create tag entry in db
        const response=await Tag.create({
            name:name,
            description:description
        })
        console.log("Tag created is ",response)

        return res.status(200).json({
            success:true,
            message:"tag created successfully"
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"error in creating tag",
            error:err.message
        })
    }
}

//to get all tags present in db
exports.getAllTags=async (req,res)=>{
    try{
        //we written the second parametere below in fn  to just make sure we get only those tags entry which have both name and description present
        const response=await Tag.find({},{name:true,description:true})

        return res.status(200).json({
            success:true,
            message:"tags fetched successfully",
            response
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"error in fetching all tags",
            error:err.message
        })
    }
}