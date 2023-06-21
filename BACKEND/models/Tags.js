const mongoose=require('mongoose')
//Tag is created to create category like DSA, AI , development. which will have multiple courses inside it
//this tag creation will only be done by admin no on else can create edit tags.
const tagSchema=new mongoose.Schema({
   name:{
    type:String
   },
   description:{
    type:String
   },
   Courses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
   }],
})

module.exports=mongoose.model("Tag",tagSchema)
//Tag is created to create category like DSA, AI , development. which will have multiple courses inside it
//this tag creation will only be done by admin no on else can create edit tags.