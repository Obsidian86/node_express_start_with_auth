const bcrypt = require('bcrypt')
const User = require('../../schema/user')
const getToken = require('../../utilities/tokens')
const jwt = require('jsonwebtoken')

let authHandler = {}

authHandler.registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const newUser = await User.create({username, email, password})
        const {userObject, token} = getToken({username, _id: newUser._id})
        res.status(200).json({user: {...userObject, email, userType: newUser.user_type}, token})
    } catch (error) {
        let message = 'Unable to create user'
        if(error.code === 11000){
            if(error.keyValue['username']) message = 'Username already exists'
            if(error.keyValue['email']) message = 'Email already exists'
        }
        return next({
            status: 400,
            message
        })
    }
}

authHandler.loginUser = async(req, res, next) => {
    try {
        const {username, password} = req.body
        const getUser = await User.findOne({username})
        if(getUser){
            const passMatch = await bcrypt.compare(password, getUser.password)
            if( !passMatch ) throw new Error("Incorrect password")
            else {
                const {userObject, token} = getToken({username, _id: getUser._id})
                res.status(200).json({user: {...userObject, email: getUser.email, userType: getUser.user_type}, token})
            }
        } else throw new Error("No user found")
    } catch (error) {
        return next({
            status: 400,
            message: error.message || 'Unable to log in'
        })
    }

}

authHandler.refreshUser = async (req, res, next) => {
    try {
        const username = req.params && req.params.username
        const refreshToken = req.body.refreshtoken

        const getUser = await User.findOne({username})
        const _id = getUser._id

        const getAuth = req.headers && req.headers.authorization
        if(!getAuth) throw new Error('No auth token provided')

        const splitToken = getAuth.split(' ')
        if(splitToken.length < 2) throw new Error('Invalid auth token')

        const currentToken = splitToken[1]

        jwt.verify(refreshToken, process.env.REFRESHSECRET, function(err, decoded) {
            try {
                if(err) throw new Error('Invalid token')
                const shouldRefresh = (decoded.replace === currentToken) && 
                    new Date(decoded.expires) > new Date(Date.now()) &&
                    decoded.username === username &&
                    decoded._id === _id.toString()
                if(!shouldRefresh) throw new Error('Could not refresh token')
                const {userObject, token} = getToken({username, _id})
                res.status(200).json({user: {...userObject, userType: getUser.user_type}, token})
            } catch (error) {
                return next({
                    status: 400,
                    message: error.message || 'Error refreshing token'
                })
            }
          });
    } catch (error) {
        return next({
            status: 400,
            message: error.message || 'Error refreshing token'
        })
    }
}

module.exports = authHandler