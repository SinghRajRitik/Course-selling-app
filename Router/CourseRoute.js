const express = require('express')
const { courseModel, purchaseModel } = require('../db')
const userMiddleware = require('../middleware/user')
const courseRouter = express.Router()


courseRouter.get("/preview", async (req, res) => {
    const courses = await courseModel.find({})
    res.json({
        message: "all available cources",
        courses : courses
    })
})

courseRouter.post("/purchase",userMiddleware, async (req, res) => {
    const userId = req.userId
    const courseId = req.body.courseId;
    const purchase = await purchaseModel.create({
        courseId : courseId,
        userId : userId
    })

    res.json({
        message: "purchased courses here",
        purchase
    })
})

module.exports = courseRouter