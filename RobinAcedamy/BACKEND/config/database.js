const mongoose=require('mongoose')
require('dotenv').config()
const dBConnectFn=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("DB Connected Successfully")).catch((err)=>{
        console.log("DB not Connected")
        //exit with error
        process.exit(1)
    })
}

module.exports=dBConnectFn