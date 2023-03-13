const express = require('express');
const router = express.Router();
const {createAdmin,loginAdmin}=require("../controllers/adminController")
const {createProduct,getProduct,getProductById,updateProduct,deleteProduct,searchByKey,searchProductByUserId}=require("../controllers/productController")
const {createUser,loginUser,allProduct}=require("../controllers/userController")
const {authentication,authenticationforNorm,authParams,authBody}=require("../auth/auth")
//Admin
router.post("/createAdmin",createAdmin)
router.post("/loginAdmin",loginAdmin)

//product
router.post("/product",authentication,authBody,createProduct)
router.get("/Product",authentication,getProduct)
router.get("/Product/:ProductId",authentication,authParams,getProductById)
router.put("/Product/:ProductId",authentication,authParams,updateProduct)
router.delete("/Product/:ProductId",authentication,authParams,deleteProduct)
router.get('/searchproducts/:key',authentication,searchByKey)
router.get("/myProduct",authentication,searchProductByUserId)

//Normel user
router.post("/createuser",createUser)
router.post("/login",loginUser)
router.get("/AllProduct",authenticationforNorm,allProduct)
router.get('/findProduct/:key',authenticationforNorm,searchByKey)
module.exports=router