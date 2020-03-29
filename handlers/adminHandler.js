const User = require('../schema/user')

let adminHandler = {}

adminHandler.getAllUsers = async (req, res) => {
    const getUsers = await User.find()
    res.json({users: getUsers})
}

adminHandler.getUserByUsername = async (req, res) => {
    const username = req.params.username
    const getUsers = await User.findOne({username})
    res.json({users: getUsers})
}

adminHandler.updateUser = async (req, res, next) => {
    try {
        const username = req.params.username
        const updateObject = req.body
        const getUser = await User.findOne({username})
        if(!getUser) throw new Error("Couldn't find user")
        Object.keys(updateObject).forEach(k => {
            getUser[k] = updateObject[k]
        })
        await getUser.save()
        res.status(200).json({updatedUser: getUser})
    } catch (error) {
        return next({
            status: 400,
            message: error.message || 'Error updating user'
        }) 
    }


}

module.exports = adminHandler