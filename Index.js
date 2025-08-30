const express = require('express')
const userRouter = require('./Router/UserRoute')
const adminRouter = require('./Router/AdminRoute')
const courseRouter= require('./Router/CourseRoute')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(express.json())



app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/course",courseRouter)


async function main(){
    await mongoose.connect(process.env.MONGO_URL)
}
main().catch(err => console.log(err))



app.listen(3000,()=>{console.log("server started at port 3000")})