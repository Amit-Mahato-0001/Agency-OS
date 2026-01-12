require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const router = require('./routes/auth.route')

const app = express()
connectDB()

app.use(express.json())

app.get('/health', (req, res) => {
    res.json({ status: "Ok hai ji" })
})

app.use('/api/auth', router)

module.exports = app