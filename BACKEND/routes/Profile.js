const express=require('express')
const profileRoutes=express.Router()

//importing auth middleware
const {authenticate}=require('../middlewares/auth')
//importing all handlers of profil controller
const {updateProfile,getAllUserDetails,updateDisplayPicture,getEnrolledCourses}=require('../controllers/Profile')
const {deleteAccount}=require('../controllers/DeleteAccount')

// Delete User Account
profileRoutes.delete("/deleteProfile",authenticate,deleteAccount)

profileRoutes.put("/updateProfile",authenticate,updateProfile)
profileRoutes.put("/updateDisplayProfile",authenticate,updateDisplayPicture)

profileRoutes.get("/getUserDetails",authenticate,getAllUserDetails)
profileRoutes.get("/getEnrolledCourses",authenticate,getEnrolledCourses)

module.exports=profileRoutes