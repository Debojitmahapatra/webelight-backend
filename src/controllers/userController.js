const userModel=require("../models/userModel")
const validData=require("../validators/validators")
const productMoodel=require("../models/productModel")
const jwt=require("jsonwebtoken")

module.exports.createUser=async function(req,res){
  
 try { 
    let data=req.body
    if(Object.keys(data).length==0){return res.status(400).send({ status: false, message: "Please enter your details" })}
    let { fname, lname, email,  password }=data
   
    //fname validation==>
    if(!validData.isValid(fname)){
        return res.status(400).send({ status: false, message: "Please enter fname" })
    }
    if (!/^[a-zA-Z]+$/.test(fname)) {
        return res.status(400).send({ status: false, message: "fname should alpha characters" })
      };
      //lname validation==>
      if(!validData.isValid(lname)){
        return res.status(400).send({ status: false, message: "Please enter lname" })
    }
    if (!/^[a-zA-Z]+$/.test(lname)) {
        return res.status(400).send({ status: false, message: "lname should alpha characters" })
      };
    //email validation==>
    if(!validData.isValid(email)){
        return res.status(400).send({ status: false, message: "Please enter email" })
    }
    if(!validData.isValidEmail(email)){
        return res.status(400).send({ status: false, message: "Please enter a valid email" })
    }
    let IsUniqueemail=await userModel.findOne({email:email})
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

   

    //-------------CREATE USER============>
    let createUser=await userModel.create(data)
    res.status(201).send({ status: true, message: 'Success', data: createUser })

}
catch (err) {
  res.status(500).send({ error: err.message })
}

}

module.exports.loginUser = async function (req, res) {
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
  
      let user = await userModel.findOne({ email: userName, password: password }).select("-password")
      
      if (!user)
        return res.status(400).send({
          status: false,
          message: "username or the password is not corerct",
        });
      let token = jwt.sign(
        {
          userId: user._id.toString(),
  
        },
        "Norm-user", { expiresIn: '2d' }
      );
      res.setHeader("BearerToken", token);
      res.status(200).send({ status: true,user,auth: token, message:"Login Successfull" });
    }
    catch (err) {
      res.status(500).send({ message: "Error", error: err.message })
    }
  }
  module.exports.allProduct = async function (req, res) {
    try {
       
        const data = req.query
        let obj = { isDeleted: false }
        if (Object.keys(data).length !== 0) {
        let { ProductName,category, price } = data

        if (ProductName && validData.isValid(ProductName)) { obj.ProductName = ProductName}
            if (category && validData.isValid(category)) { obj.category = category}
            if (price && validData.isValid(price)) { obj.price = price } 

        }
        let find = await productMoodel.find(obj)
        if (find.length == 0) {
            return res.status(404).send({ status: false, message: "No product found" })
        }
        res.status(200).send({ status: true, message: "product List", data: find })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}