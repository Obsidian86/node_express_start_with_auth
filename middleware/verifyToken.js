const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    try {
        const getAuth = req.headers.authorization
        const token = getAuth.split(" ")[1]
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            try {
                if(err) throw new Error('Unable to verify token')
                if(decoded.expires){
                    if(decoded.expires < Date.now()){
                        return next()
                    }
                    throw new Error("Token has expired")
                }
                throw new Error()
            } catch (error) {
                return next({
                    status: 400,
                    message: error.message || 'Error verifying token'
                })
            }
        })
    } catch (error) {
        return next({
            status: 400,
            message: error.message || 'Error verifying token'
        })
    }
}

module.exports = verifyToken