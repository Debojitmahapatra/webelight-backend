const jwt = require('jsonwebtoken')
const productModel=require("../models/productModel")
const adminModel=require("../models/adminModel")
const mongoose = require('mongoose');



module.exports.authentication = function (req, res, next) {
  try {

    let token = req.header('Authorization', 'Bearer Token');

    if (!token)
      return res
        .status(401)
        .send({ status: false, message: "not authorized" });
        
  let  bearerToken = token.split(' ')[1]
   

   jwt.verify(bearerToken, "debojit-security", (err, user) => {
      if (err)
        return res.status(401).send({ message: err.message });
       req.user = user;
  

      next();
    });
  }
  catch (err) {
    res.status(500).send(err.message)
  }
}
module.exports.authenticationforNorm = function (req, res, next) {
  try {

    let token = req.header('Authorization', 'Bearer Token');

    if (!token)
      return res
        .status(401)
        .send({ status: false, message: "not authorized" });
        
  let  bearerToken = token.split(' ')[1]

   jwt.verify(bearerToken, "Norm-user", (err, user) => {
      if (err)
        return res.status(401).send({ message: err.message });
       req.user = user;
  

      next();
    });
  }
  catch (err) {
    res.status(500).send(err.message)
  }
}
module.exports.authParams = async function (req, res, next) {
  try {
    let ProductId = req.params.ProductId
 
    if (!mongoose.isValidObjectId(ProductId)) { return res.status(400).send({ status: false, message: "invalid ProductId" }) }
    let data1 = await productModel.findById({ _id: ProductId }).select({ userId: 1, _id: 0 })
  
    if (!data1) { return res.status(404).send({ status: false, message: "ProductId doesnot exists" }) }
    let userId = data1.userId.valueOf()
    let userId1 = req.user.userId
   
    //let d = userId
    if (userId1 != userId)
      return res.status(403).send({ status: false, message: "Not allowed to modify another data" })

    next()
  }
  catch (err) {
    res.status(500).send({ error: err.messsage })
  }
}


module.exports.authBody = async function (req, res, next) {
  try {
    let userId = req.body.userId
    

    if (!mongoose.isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "invalid user id" }) }
    let data = await adminModel.findById({ _id: userId })

    if (!data) { return res.status(404).send({ status: false, message: "userId doesnot exists" }) }

    let userId1 = req.user.userId
    if (userId != userId1)
      return res.status(403).send({ status: false, message: "Not allowed to modify another data" })

    next()
  }
  catch (err) {
    res.status(500).send({ error: err.messsage })
  }

}

module.exports.authuserParams = async function (req, res, next) {
  try {
    let userId = req.params.userId
    

    if (!mongoose.isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "invalid user id" }) }
    let data = await adminModel.findById({ _id: userId })

    if (!data) { return res.status(404).send({ status: false, message: "userId doesnot exists" }) }

    let userId1 = req.user.userId
    if (userId != userId1)
      return res.status(403).send({ status: false, message: "Not allowed to modify another data" })

    next()
  }
  catch (err) {
    res.status(500).send({ error: err.messsage })
  }

}