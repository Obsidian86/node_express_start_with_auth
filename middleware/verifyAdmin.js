const User = require("../schema/user")
const jwt = require('jsonwebtoken')

const verifyAdmin = async (req, res, next) => {
    try {
        const getAuth = req.headers.authorization
        const token = getAuth.split(" ")[1]
        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            try {
                if(err) throw new Error('Invalid token')
                const findUser = await User.findOne({username: decoded.username})
                if(!findUser) throw new Error('Could not find user')
                if(findUser.user_type !== 'admin') throw new Error('User type not admin')
                return next()
            } catch (error) {
                return next({
                    status: 400,
                    message: error.message || 'Error verifying admin'
                })
            }
        })
    } catch (error) {
        return next({
            status: 400,
            message: error.message || 'Error verifying admin'
        })
    }

}

module.exports = verifyAdmin