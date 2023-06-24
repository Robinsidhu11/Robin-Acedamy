const express=require('express')
const profileRoutes=express.Router()

//importing auth middleware
const {authenticate}=require('../middlewares/auth')
//importing all handlers of profil controller
const {updateProfile,getAllUserDetails,updateDisplayPicture,getEnrolledCourses}=require('../controllers/Profile')
const {deleteAccount}=require('../controllers/DeleteAccount')
module.exports=profileRoutes