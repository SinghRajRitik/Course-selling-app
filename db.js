const mongoose = require('mongoose')
const {Schema} = mongoose;
const objectId = Schema.Types.ObjectId


const userSchema = new Schema({
    fname : String,
    lname : String,
    email : String,
    password : String,
    phoneNo : Number
    
})

const adminSchema = new Schema({
    fname : String,
    lname : String,
    email : String,
    password : String,
    phoneNo : Number
    
})

const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    image : String,
    creater : objectId,
})

const purchaseSchema = new Schema({
    courseId : objectId,
    userId : objectId

})

const userModel = mongoose.model("user",userSchema)
const courseModel = mongoose.model("course",courseSchema)
const adminModel = mongoose.model("admin",adminSchema)
const purchaseModel = mongoose.model("purchase",purchaseSchema)


module.exports = ({
    userModel,
    courseModel,
    adminModel,
    purchaseModel
})


