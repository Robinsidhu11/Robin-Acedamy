const express=require('express')
const paymentsRoutes=require('./routes/Payments')
const userRoutes=require('./routes/User')
const profileRoutes=require('./routes/Profile')
const courseRoutes=require('./routes/Course')
const dBConnectFn=require('./config/database')
const cookieParser=require('cookie-parser')
const {connectCloudinary}=require('./config/cloudinary')
const cors=require('cors')
const fileUpload = require('express-fileupload')
require('dotenv').config()

const app=express();
const PORT=process.env.PORT || 4000;

//database connect
dBConnectFn()

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    //important to write so that any request from this above page gets entertain by our server
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

//cloudinary connect
connectCloudinary()

//mounting routes
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payment",paymentsRoutes)


app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`)
})

//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"your server is up and running"
    })
})