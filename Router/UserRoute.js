const express = require('express')
const userRouter = express.Router()
const { userModel, courseModel, purchaseModel } = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userMiddleware = require('../middleware/user')


userRouter.post("/signup", async (req, res) => {
    const { email, password, fname, lname, mobile } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5)

    await userModel.create({
        email: email,
        password: hashedPassword,
        fname: fname,
        lname: lname,
        phoneNo: mobile
    })

    res.json({
        message: "Your are Successfully SignUp"
    })
})

userRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({
            email: email
        })

        if (!user) {
            return res.json({
                message: "user doesn't exist." })           
        }

        const decodePassword = await bcrypt.compare(password, user.password)

        if (!decodePassword) {
            return res.json({
                message: "Invalid Credentials." })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.USER_JWT_SECRET)

        res.json({
            message: "you are signin.",
            token: token
        })

    } catch (error) {
        console.error(err => console.error())

    }
})


userRouter.get("/purchases",userMiddleware, async (req, res) => {
        const userId = req.userId

        const purchase = await purchaseModel.find({
            userId
        })
      let purchasedCourseId = []
      for(let i = 0;i <purchase.length;i++){
        purchasedCourseId.push(purchase[i].courseId)
      }

        const courses = await courseModel.find({
        _id : {$in : purchasedCourseId}

        })
    res.json({
        message: "user purchase end point here",
        courses : courses
    })
})


module.exports = userRouter