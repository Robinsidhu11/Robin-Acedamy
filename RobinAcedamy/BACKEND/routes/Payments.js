const express=require('express')
const paymentsRoutes=express.Router()
const {authenticate,isStudent,isInstructor,isAdmin}=require('../middlewares/auth')
const {capturePayment,verifySignature}=require('../controllers/Payments')

paymentsRoutes.post("/capturePayment",authenticate,isStudent,capturePayment)
paymentsRoutes.post("/verifyPayment",verifySignature)
module.exports=paymentsRoutes