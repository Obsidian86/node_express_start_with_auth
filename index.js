require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.port || 8585
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const errorHandler = require('./handlers/errorHandler')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')

const verifyUser = require('./middleware/verifyUser')
const verifyToken = require('./middleware/verifyToken')
const verifyAdmin = require('./middleware/verifyAdmin')

// mongo connect
const mongoConfig = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
mongoose.connect(process.env.DATABASE, mongoConfig, err => {
    if(err) throw err
    console.log('Mongo DB connected')
})

app.use(bodyParser.json())

// ROUTES
app.use('/auth', authRoutes)
app.use('/admin', verifyToken, verifyAdmin, adminRoutes)

// No ROUTE FOUND
app.use('*', (req, res, next) => {
  next({ status: 404, message: "Route does not exist" })
})

// HANDLE ERRORS
app.use('*', errorHandler)

app.listen(port, ()=> console.log('connected on port: ' + port))