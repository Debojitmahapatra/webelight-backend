const productMoodel=require("../models/productModel")
const validData=require("../validators/validators")

module.exports.createProduct=async function(req,res){
    try{
      let data=req.body
      let {ProductName,price,image,userId,category}=data

    //ProductName validations=>
    if(!validData.isValid(ProductName)){
        return res.status(400).send({ status: false, message: "Please enter ProductName" })
    }
    //price validations=>
    if(!validData.isValid(price)){
        return res.status(400).send({ status: false, message: "Please enter price" })
    }
    if(!validData.isValidPrice(price)){
        return res.status(400).send({ status: false, message: "Please enter valid price" })
    }
    //image validations=>
    if(!validData.isValid(image)){
        return res.status(400).send({ status: false, message: "Please enter image" })
    }
    //userId validations=>
    if(!validData.isValid(userId)){
        return res.status(400).send({ status: false, message: "Please enter userId" })
    }
    if(!validData.isValidObjectId(userId)){
        return res.status(400).send({ status: false, message: "Please enter valid userId" })
    }
    //category validations=>
    if(!validData.isValid(category)){
        return res.status(400).send({ status: false, message: "Please enter category" })
    }


   //------create Product=============>

   let createpro=await productMoodel.create(data)
   res.status(201).send({ status: true, message: 'Success', data: createpro })

    }
    catch(err){
        res.status(500).send({ error: err.message })
    }
}

module.exports.getProduct = async function (req, res) {
    try {
       
        const data = req.query
        let obj = { isDeleted: false }
        if (Object.keys(data).length !== 0) {
        let { category, price } = data

          
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

module.exports.getProductById=async function(req,res){
    try{
        let id=req.params.ProductId
        console.log(id)
        if(!validData.isValid(id)){
            return res.status(400).send({ status: false, message: "Please enter ProductId" })
        }
        id=id.trim()
        if(!validData.isValidObjectId(id)){
            return res.status(400).send({ status: false, message: "Please enter valid ProductId" })
        }
        let product=await productMoodel.findById(id)
        if(!product){
            return res.status(404).send({ status: false, message: "No product found" }) 
        }
        if(product.isDeleted==true){
            return res.status(404).send({ status: false, message: "No product found" })
        }
        res.status(200).send({ status: true, message: "SUCCESS", data: product })

    }catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
module.exports.updateProduct=async function(req,res){
    try {
        let id=req.params.ProductId
        if(!validData.isValid(id)){
            return res.status(400).send({ status: false, message: "Please enter ProductId" })
        }
        id=id.trim()
        if(!validData.isValidObjectId(id)){
            return res.status(400).send({ status: false, message: "Please enter valid ProductId" })
        }
        let data=req.body
        let {ProductName,price,image,category}=data
        let product=await productMoodel.findById(id)
        if(!product){
            return res.status(404).send({ status: false, message: "No product found" }) 
        }
        if(product.isDeleted==true){
            return res.status(404).send({ status: false, message: "No product found" })
        }
        if(ProductName && ProductName!=product.ProductName){
            if(!validData.isValid(ProductName)){
                return res.status(400).send({ status: false, message: "Please enter ProductName" })
            }
        }
        if(price && price!=product.price){
            if(!validData.isValid(price)){
                return res.status(400).send({ status: false, message: "Please enter price" })
            }
            if(!validData.isValidPrice(price)){
                return res.status(400).send({ status: false, message: "Please enter valid price" })
            }
        }
        if(image && image!=product.image){
            if(!validData.isValid(image)){
                return res.status(400).send({ status: false, message: "Please enter image" })
            }
        }
        if(category && category!=product.category){
            if(!validData.isValid(category)){
                return res.status(400).send({ status: false, message: "Please enter category" })
            }
        }
        let obj={
            ProductName,
            price,
            image,
            category
        }
        
        let updateproduct=await productMoodel.findOneAndUpdate({_id:id,isDeleted: false},{$set:obj},{new:true})
        res.status(200).send({ status: true, message: "product updated successfully", data: updateproduct })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
module.exports.deleteProduct=async function(req,res){
   try { 
    let id=req.params.ProductId
    if(!validData.isValid(id)){
        return res.status(400).send({ status: false, message: "Please enter ProductId" })
    }
    id=id.trim()
    if(!validData.isValidObjectId(id)){
        return res.status(400).send({ status: false, message: "Please enter valid ProductId" })
    }

    let product=await productMoodel.findById(id)
    
    if(!product){
        return res.status(404).send({ status: false, message: "No product found" }) 
    }
    if(product.isDeleted==true){
        return res.status(404).send({ status: false, message: "No product found" })
    }
    let deletePro=await productMoodel.findOneAndUpdate({_id:id,isDeleted: false},{$set:{isDeleted:true,deletedAt:Date.now()}},{new:true})
    res.status(200).send({ status: true, message: "product deleted successfully"})
    }catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.searchByKey = async function (req, res) {
    try {
      let key = req.params.key
      let result = await productMoodel.find(
        {isDeleted:false,
          "$or": [
            {ProductName:{ $regex: key }},
            { price: { $regex: key } },
            { category: { $regex: key } }
          ]
        }
      )
      if(result.length>0){
         return res.status(200).send(result)
      }
      else{
        return res.status(404).send({ status: false, message: "No match found" })
      }
    }
    catch (err) {
      res.status(500).send({ message: err.message })
    }
  }
  module.exports.searchProductByUserId=async function(req,res){
    try{ 
        let userId = req.user.userId
        let products =await productMoodel.find({userId:userId,isDeleted: false})
       
        if(products.length>0){
       return res.status(200).send( products );
        }else{
       res.status(404).send({ status: false, msg: "No product found" });
      }
    
      }
    catch(err){
          res.status(500).send({message : err.message})
      }
    
  }