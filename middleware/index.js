const verifyAdmin = require('./verifyAdmin')
const verifyToken = require('./verifyToken')
const verifyUser = require('./verifyUser')

let middleware = {}
middleware.verifyAdmin = verifyAdmin
middleware.verifyToken = verifyToken
middleware.verifyUser = verifyUser

module.exports = middleware