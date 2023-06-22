const User=require('../models/User')
const Profile=require('../models/Profile')

//we wont be creating profile rather we will be updating profile.
// because we already created profile while creatiing a user (sign up). so now we have profile linked to every user just thing is that
// we had put everything null in profile

exports.updateProfile=async (req,res)=>{
    try{
        //get data //making about and contactNumber optional
        const {gender,about="",dateOfBirth="",contactNumber}=req.body
        //get user id (we have passed while creating token, id in user)
        const userid=req.user.id

        //validation for mandatory fields
        if(!contactNumber || !gender){
            return res.status(400).json({
                success:false,
                message:" gender and contact Number is mandatory to fill"
            })
        }

        //find user, then its profile id linked to it
        const userDetails=await User.findById({_id:userid})
        const profileId=userDetails.additionalDetails

        //UPDATE PROFILE WITH DATA
        //lets see two methods of updating data now
        //METHOD 1 mostly we use
        const updatedProfile=await Profile.findByIdAndUpdate(
            {_id:profileId},
            {gender,about,dateOfBirth,contactNumber},
            {new:true}
        )

        //METHOD 2 using save
        // const profileDetails=await Profile.findById({_id:profileId})
        // profileDetails.gender=gender
        // profileDetails.dateOfBirth=dateOfBirth
        // profileDetails.contactNumber=contactNumber
        // profileDetails.about=about
        // await profileDetails.save()


        return res.status(200).json({
            success:true,
            message:"profile details updated successfully",
            newProfiledataIs:updatedProfile
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"profile details cant be updated",
            error:err.message
        })
    }
}

//GET all details of a USER 
exports.getAllUserDetails=async (req,res)=>{
    try{
        //get user id
        const userid=req.user.id

        //validation
        if(!userid){
            return res.status(400).json({
                success:false,
                message:"user id not avaliable"
            })
        }

        //validate user from db
        const userDetails=await User.findById({_id:userid}).populate("additionalDetails").exec()

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"no such user exist in db"
            })
        }

        return res.status(200).json({
            success:true,
            message:"user details fetched",
            userDetails
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cant fetch user detail",
            error:err.message
        })
    }
}