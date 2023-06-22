const mongoose=require('mongoose')

const tagSchema=new mongoose.Schema({
    names: {
        type:String,
        trim:true
    }
   
})

module.exports=mongoose.model("Tag",tagSchema)