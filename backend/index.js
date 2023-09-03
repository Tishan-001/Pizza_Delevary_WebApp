const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require("mongoose")
const app = express()

//connect database
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL, () => console.log('DataBase is successfully connected!'))

//start server
app.listen(process.env.PORT, () => console.log('Sever has been started successfully!'))