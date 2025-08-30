const express = require('express')
const adminRouter = express.Router()
const { adminModel, userModel } = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwt_secret = "adminsecret2022"


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
        }, jwt_secret)

        res.json({
            message: "you are sign in",
            token: token

        })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message : "Internal server Error"
            })

    }

})

adminRouter.post('/create', (req, res) => {
    res.json({
        message: "create course end point"
    })
})
adminRouter.delete("/delete-course", (req, res) => {
    res.json({
        message: "delete course route"
    })
})
adminRouter.patch("/update", (req, res) => {
    res.json({
        message: "update course route"
    })
})
adminRouter.get("/courses/bulk", (req, res) => {
    res.json({
        message: "all course  admin created route"
    })
})
module.exports = adminRouter