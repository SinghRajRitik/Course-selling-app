const express = require('express')
const courseRouter = express.Router()


courseRouter.get("/preview",(req,res)=>{
    res.json({
        message : "course preview here"
    })
})
courseRouter.get("/purchased",(req,res)=>{
    res.json({
        message : "purchased courses here"
    })
})

module.exports = courseRouter