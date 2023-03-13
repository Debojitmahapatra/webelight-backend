const adminModel=require("../models/adminModel")
const validData=require("../validators/validators")
const jwt=require("jsonwebtoken")

module.exports.createAdmin=async function(req,res){
  
 try { 
    let data=req.body
    if(Object.keys(data).length==0){return res.status(400).send({ status: false, message: "Please enter your details" })}
    let {name,email,password,confirmpassword,mobileNo,gander,city,district,pincode}=data
   
    //name validation==>
    if(!validData.isValid(name)){
        return res.status(400).send({ status: false, message: "Please enter name" })
    }
    if(!validData.isValidName(name)){
        return res.status(400).send({ status: false, message: "Please enter a valid name" })
    }
    
    //email validation==>
    if(!validData.isValid(email)){
        return res.status(400).send({ status: false, message: "Please enter email" })
    }
    if(!validData.isValidEmail(email)){
        return res.status(400).send({ status: false, message: "Please enter a valid email" })
    }
    let IsUniqueemail=await adminModel.findOne({email:email})
    if(IsUniqueemail){
        return res.status(400).send({ status: false, message: "Please enter a unique email" })
    }

    //password validation==>

    if(!validData.isValid(password)){
        return res.status(400).send({ status: false, message: "Please enter password" })
    }
    if(!validData.isValidPassWord(password)){
        return res.status(400).send({ status: false, message: "password must be Minimum eight characters, at least one letter, one number and one special characte" })
    }

    //confirmpassword validation==>
    if(!validData.isValid(confirmpassword)){
        return res.status(400).send({ status: false, message: "Please enter confirmpassword" })
    }
    if(password!=confirmpassword){
        return res.status(400).send({ status: false, message: "confirmpassword must be same as password" })
    }

    //mobileNo validation==>
    if(!validData.isValid(mobileNo)){
        return res.status(400).send({ status: false, message: "Please enter mobileNo" })
    }
    if(!validData.isValidMobile(mobileNo)){
        return res.status(400).send({ status: false, message: "Please enter a valid mobileNo" })
    }
    let IsUniqueMobile=await adminModel.findOne({mobileNo:mobileNo})
    if(IsUniqueMobile){
        return res.status(400).send({ status: false, message: "Please enter a unique mobileNo" })
    }

    //gander validation==>
    if(!validData.isValid(gander)){
        return res.status(400).send({ status: false, message: "Please enter gander" })
    }

    let gen = ["Male","Female"]
        let gencheck = gen.find(ele => ele == gander)
        if (!gencheck) { return res.status(400).send({ status: false, message: "Enter your gander between Male and Female" }) }
    
    //pincode validation==>
    if(!validData.isValid(pincode)){
        return res.status(400).send({ status: false, message: "Please enter pincode" })
    }
    if(!validData.isValidPin(pincode)){
        return res.status(400).send({ status: false, message: "Please enter a valid pincode" })
    }

    //-------------CREATE admin============>
    let createUser=await adminModel.create(data)
    res.status(201).send({ status: true, message: 'Success', data: createUser })

}
catch (err) {
  res.status(500).send({ error: err.message })
}

}

module.exports.loginAdmin = async function (req, res) {
    try {
   
      let userName = req.body.email;
      let password = req.body.password;

    if (!validData.isValid(userName)) { return res.status(400).send({ status: false, message: "Please enter your email" }) }
    if(!validData.isValidEmail(userName)){
        return res.status(400).send({ status: false, message: "Please enter a valid email" })
    }
    if (!validData.isValid(password)) { return res.status(400).send({ status: false, message: "Please enter your password" }) }
    if(!validData.isValidPassWord(password)){
        return res.status(400).send({ status: false, message: "Please enter a valid password" })
    }
  
      let user = await adminModel.findOne({ email: userName, password: password }).select("-password")
      
      if (!user)
        return res.status(400).send({
          status: false,
          message: "username or the password is not corerct",
        });
      let token = jwt.sign(
        {
          userId: user._id.toString(),
  
        },
        "debojit-security", { expiresIn: '2d' }
      );
      res.setHeader("BearerToken", token);
      res.status(200).send({ status: true,user,auth: token, message:"Login Successfull" });
    }
    catch (err) {
      res.status(500).send({ message: "Error", error: err.message })
    }
  }