const express=require('express')
const userRoutes=express.Router()

//importing auth middleware
const {authenticate}=require('../middlewares/auth')
//importing all handlers of user controller
const {sendOTP,login,signUp,changePassword}=require('../controllers/Auth')
//import reset passwrd and reset token generate handlers too
const {resetPasswordTokenCreate,resetPasswordFn}=require('../controllers/ResetPassword')

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// routes for signup login, send otp, change password
userRoutes.post("/login",login)
userRoutes.post("/signup",signUp)
userRoutes.post("/sendotp",sendOTP)
userRoutes.post("/changepassword",authenticate,changePassword)


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
userRoutes.post("/reset-password-token",resetPasswordTokenCreate)

// Route for resetting user's password after verification
userRoutes.post("/reset-password",resetPasswordFn)

module.exports=userRoutes