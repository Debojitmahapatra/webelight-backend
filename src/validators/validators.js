const mongoose=require("mongoose")

const isValid = function (value) {
    if(value === "") {return false}
    if( typeof value === 'undefined' || value === null) { return false; }
    if( typeof value    === 'string' && value.trim().length === 0) { return false; } 
    return true;
}


const isValidName=function (data){
    let Name = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/
    if (!Name.test(data)) return false
    else return true
}
const isValidEmail=function (data){
    let email = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,3}$/;
    if(!email.test(data)) return false
    else return true
}
const isValidObjectId=function(data){
    return mongoose.isValidObjectId(data);
}
const isValidMobile=function(data){
    let mobile = /^[0]?[6789]\d{9}$/;
    if(!mobile.test(data)) return false
    else return true
}
const isValidPin=function(data){
    let pinNo = /^[1-9][0-9]{5}$/
    if(!pinNo.test(data)) return false
    else return true
}
const isValidPassWord=function(data){
    const Password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!Password.test(data)) return false
    else return true
}

const isValidPrice=function(data){
    const price=/^(0|[1-9]\d*)(\.\d+)?$/   
   if(!price.test(data)) return false
    else return true
}
module.exports={
    isValid,
    isValidName,
    isValidEmail,
    isValidObjectId,
    isValidMobile,
    isValidPin,
    isValidPassWord,
    isValidPrice
}
