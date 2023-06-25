const nodemailer=require('nodemailer');
require('dotenv').config()
const mailSender=async (email,subject,body)=>{
    try{
        const transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
        const info=await transporter.sendMail({
            from:"RobinAcedamy || By Robin sidhu",
            to:`${email}`,
            subject:`${subject}`,
            html:`${body}`

        })
        console.log("Mail sent, info : ",info)
        return info
    }
    catch(err){
        console.log("Mail not sent")
        console.log(err.message)
    }
}

module.exports=mailSender