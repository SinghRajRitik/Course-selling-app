const express = require('express')
const userRouter = express.Router()
const {userModel} = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwt_secret = "usersecret60224"


userRouter.post("/signup",async (req,res)=>{
    const { email , password , fname , lname , mobile } = req.body;

    const hashedPassword = await bcrypt.hash(password,5)

    await userModel.create({
        email : email,
        password : hashedPassword,
        fname : fname,
        lname : lname,
        phoneNo: mobile
    })

    res.json({
        message : "Your are Successfully SignUp"
    })
})

userRouter.post("/signin", async (req,res)=>{
    const {email , password} = req.body;

    const decodedPassword = await bcrypt.compare()
    res.json({
        message: "You are signed in"
    })
})
userRouter.get("/purchases",(req,res)=>{
    res.json({
        message:"user purchase end point here"
    })
})


module.exports = userRouter