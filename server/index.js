require(`dotenv`).config()

const mongoose = require("mongoose")
const express = require('express')
const path = require("path");
const cors = require("cors")
const fileUpload = require('express-fileupload')
const errorHandler = require("./middlewares/errorHandler")
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 5000

const app = express()
mongoose.set('strictQuery', true)

mongoose.connect(DB_URL, () => {
    console.log("server connected to db")
})

app.use(cors())
app.use(errorHandler)
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.listen(PORT, ()=>console.log("server is started"))