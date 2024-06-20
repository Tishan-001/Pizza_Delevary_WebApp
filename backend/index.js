const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require("mongoose")
const authController = require('./controllers/authController')
const productController = require('./controllers/productController')
const uploadController = require('./controllers/uploadController')
const app = express()

//connect database
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL, () => console.log('DataBase is successfully connected!'))

//routes & middlewares
//those two middlewares make req.body accessible, otherwise it would be undefined!!!
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/images', express.static('public/images'))
app.use('/auth', authController)
app.use('/product', productController)
app.use('/upload', uploadController)

//start server
app.listen(process.env.PORT, () => console.log('Sever has been started successfully!'))

//server is on port 5000, client is on port 3000, we are going to get a cros ERROR!!, but cors() remove that's error