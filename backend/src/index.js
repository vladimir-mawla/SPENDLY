const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const  connectDB = require('./config/db')

dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}`)})

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
// app.use('/api', require('./api/routes'))

app.listen(port, () => console.log(`Server running on port ${port}`))
