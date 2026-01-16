require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const router = require('./routes/auth.route')
const authenticate = require('./middleware/auth.middleware')

const app = express()
connectDB()

app.use(express.json())

app.get('/health', (req, res) => {
    res.json({ status: "Ok hai ji" })
})

app.use(authenticate)

app.get("/api/me", (req, res) => {
    res.json({
        user: req.user,
        tenant: {
            id: req.tenant._id,
            name: req.tenant.name,
            plan: req.tenant.plan
        }
    })
})

module.exports = app