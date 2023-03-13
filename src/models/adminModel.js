const mongoose=require("mongoose")

let adminSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
  confirmpassword:{
    type: String,
    required: true,
  },

  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  gander:{
    type:String,
    required: true,
    enum:["Male","Female"]
  },
  city:{
    type:String,
    required: true,
  },
  district:{
    type:String,
    required: true,
  },
  pincode:{
    type:String,
    required: true,
  },
},{timestamps:true})
 
module.exports=mongoose.model("Admin",adminSchema)