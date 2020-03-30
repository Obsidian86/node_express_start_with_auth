require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.port || 8585
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const errorHandler = require('./handlers/errorHandler')
const userRoutes = require("./routes/userRoutes")
const mw = require('./middleware')

// mongo connect
const mongoConfig = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
mongoose.connect(process.env.DATABASE, mongoConfig, err => {
    if(err) throw err
    console.log('Mongo DB connected')
})

app.use(cors())
app.use(bodyParser.json())

// ROUTES
app.use('/auth', userRoutes.authRoutes)
app.use('/admin', mw.verifyToken, mw.verifyAdmin, userRoutes.adminRoutes)
app.use('/profile', mw.verifyUser, mw.verifyToken, userRoutes.profileRoutes)

// No ROUTE FOUND
app.use('*', (req, res, next) => {
  next({ status: 404, message: "Route does not exist" })
})

// HANDLE ERRORS
app.use('*', errorHandler)

app.listen(port, ()=> console.log('connected on port: ' + port))