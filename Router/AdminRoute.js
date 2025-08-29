const express = require('express')
const adminRouter = express.Router()
const {adminModel} = require('../db')
const bcrypt = require('bcrypt')


adminRouter.post("/signup",async (req,res)=>{
    const {email,password,fname,lname,mobile} = req.body;

    const hashedPassword = await bcrypt.hash(password,5)

    await adminModel.create({
        email : email,
        password : hashedPassword,
        fname : fname,
        lname : lname,
        phoneNo : mobile
    })
    res.json({
        message :"you are successfully signup."
    })
})

adminRouter.post("/signin",(req,res)=>{
    res.json({
        message : "admin signin route"
    })
})

adminRouter.post('/create',(req,res)=>{
    res.json({
        message:"create course end point"
    })
})
adminRouter.delete("/delete-course",(req,res)=>{
    res.json({
        message:"delete course route"
    })
})
adminRouter.patch("/update",(req,res)=>{
    res.json({
        message:"update course route"
    })
})
adminRouter.get("/courses/bulk",(req,res)=>{
    res.json({
        message:"all course  admin created route"
    })
})
module.exports = adminRouter