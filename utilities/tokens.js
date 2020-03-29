const jwt = require('jsonwebtoken')

const getToken = userObj => {
    const expires = parseInt(process.env.TOKENVALID) * 60000
    const userObject = { ...userObj, expires: (Date.now() + expires)}
    const auth = jwt.sign(userObject, process.env.SECRET)

    const refreshExpire = parseInt(process.env.REFRESHVALID) * 60000 
    const refreshObject = { ...userObj, expires: (Date.now() + refreshExpire), replace: auth}
    return { 
        userObject: userObj, 
        token: {
            auth,
            refresh: jwt.sign(refreshObject, process.env.REFRESHSECRET)
        }
    }
}

module.exports = getToken