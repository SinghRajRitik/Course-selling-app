const express = require('express')
const { courseModel } = require('../db')
const courseRouter = express.Router()


courseRouter.get("/preview", async (req, res) => {
    const courses = await courseModel.find({})
    res.json({
        message: "all available cources",
        courses : courses
    })
})

courseRouter.get("/purchased", (req, res) => {

    res.json({
        message: "purchased courses here"
    })
})

module.exports = courseRouter