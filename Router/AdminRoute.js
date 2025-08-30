const express = require('express')
const adminRouter = express.Router()
const { adminModel, courseModel } = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { admin_jwt_secret } = require("../config")
const adminMiddleware = require('../middleware/admin')


adminRouter.post("/signup", async (req, res) => {

    const { email, password, fname, lname, mobile } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5)

    await adminModel.create({
        email: email,
        password: hashedPassword,
        fname: fname,
        lname: lname,
        phoneNo: mobile
    })
    res.json({
        message: "you are successfully signup."
    })
})

adminRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await adminModel.findOne({
            email: email
        })
        if (!user) {
            return res.status(400).json({
                message: "User not exist"
            })
        }
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.json({
                message: "invalid Credentials"
            })
        }
        const token = jwt.sign({
            id: user._id
        }, admin_jwt_secret)

        res.json({
            message: "you are sign in",
            token: token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server Error"
        })

    }
})

adminRouter.post('/create', adminMiddleware, async (req, res) => {
    try {

        const adminId = req.adminId

        const { title, description, price, imgurl } = req.body

       const course =  await courseModel.create({
            title,
            description,
            price,
            imgurl,
            createrId: adminId
        })
        res.json({
            message: "Course Added to preview.",
            courseId : course._id
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

adminRouter.delete("/delete-course",adminMiddleware, async (req, res) => {

    const adminId  = req.adminId
    const courseId = req.body.courseId

    const deletedCourse = await courseModel.find({
        createrId : adminId,
    })

    res.json({
        message: "Course deleted Successfully"
    })
})

adminRouter.patch("/update", async(req, res) => {
    const adminId = req.adminId
    
    const {title,description,price,imgurl,courseId} = req.body;

    const updatedCourse = await courseModel.updateOne({
        createrId : adminId,
        _id : courseId
    },{
        title : title,
        description : description,
        price : price,
        imgurl : imgurl,
    })
    res.json({
        message: "Course Updated Successfully",
        updated : updatedCourse._id
        
    })
})
adminRouter.get("/courses/bulk", async (req, res) => {

     const adminId = req.adminId

     const courses = await courseModel.find({
        creatorId : adminId
     })
      
    res.json({
        message: "Here all courses of admin",
        courses : courses
    })
})

module.exports = adminRouter