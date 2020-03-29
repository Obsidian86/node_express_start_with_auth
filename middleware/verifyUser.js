const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
    try {
        const username = req.params.username
        const getAuth = req.headers.authorization
        const token = getAuth.split(' ')[1]
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            try {
                if(err || username !== decoded.username) throw new Error('Invalid token')
                return next()
            } catch (error) {
                return next({
                    status: 400,
                    message: error.message || 'Unable verify user'
                })
            }
        })
    } catch (error) {
        return next({
            status: 400,
            message: error.message || 'Unable verify user'
        })
    }
}

module.exports = verifyUser