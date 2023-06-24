const Category=require('../models/Category')
const Course = require('../models/Course')

//to create a category (only for admin to access)
exports.createCategory=async (req,res)=>{
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

        //create Category entry in db
        const response=await Category.create({
            name:name,
            description:description
        })
        console.log("Category created is ",response)

        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"error in creating Category",
            error:err.message
        })
    }
}

//to get all Categories present in db
exports.getAllCategories=async (req,res)=>{
    try{
        //we written the second parametere below in fn  to just make sure we get only those Category entry which have both name and description present
        const response=await Category.find({},{name:true,description:true})

        return res.status(200).json({
            success:true,
            message:"Category fetched successfully",
            response
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"error in fetching all Categories",
            error:err.message
        })
    }
}

//to show courses on catgeory page
//say user looking for development courses,i will show those. and will also show the most selled courses or other categories courses too.
// so lets create handler
exports.categoryPageDetails=async (req,res)=>{
    try{
        //fetch category id
        const {categoryid}=req.body

        //find courses under that category id
        const selectedCategory=await Category.findById({_id:categoryid}).populate("courses").exec()

        //validation
        if(!selectedCategory){
            return res.status(400).json({
                success:false,
                message:"data not found for this category"
            })
        }

        //find rest of the categories
        //ne means not equal
        const restOfTheCategories=await Category.find({_id:{$ne:categoryid}}).populate("courses").exec() 

        //TODO: TOP SELLING COURSES, say top 10 courses
        const topSellingCourses=await Course.find({}).sort({countOfStudentsEnrolled:"desc"}).exec()
        //return
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                restOfTheCategories,
                topSellingCourses
            }
            
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant fetched courses error",
            error:err.message
        })
    }
}