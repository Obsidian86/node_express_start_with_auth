const adminRoutes = require("./adminRoutes")
const profileRoutes = require("./profileRoutes")
const authRoutes = require("./authRoutes")

let userRoutes = {}

userRoutes.adminRoutes = adminRoutes
userRoutes.profileRoutes = profileRoutes
userRoutes.authRoutes = authRoutes

module.exports = userRoutes