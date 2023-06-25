const User=require('../models/User')
const Profile=require('../models/Profile')

//delete the account 
//TODO: CRONJOB EXPLORE 
///TODO: try something like after user click delete account, this controller should execute after say 5 days. explore it
exports.deleteAccount=async (req,res)=>{
    try{
        //as user is logged in so we can get user id from req as we passed it in req while login 
        const userid=req.user.id

        //validation to make sure user exist at first place
        const userDetails=await User.findById({_id:userid})
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"user doesnt exist"
            })
        }

        //make sure we delete profile details(additional details before deleting user obj)
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})

        //TODO: make sure we unenroll user from all the enrolled users
                //find all the courses user i enrolled to
                //go to each that course and delete the user from the studentsEnrolled courses in course model

        await User.findByIdAndDelete({_id:userid})

        return  res.status(200).json({
            success:true,
            message:"account deleted successfully"
        })


    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant delete account right now",
            error:err.message
        })
    }
}