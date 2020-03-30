const User = require('../../schema/user')

let profileHandler = {}

profileHandler.getUserByUsername = async (req, res) => {
    const username = req.params.username
    const getUsers = await User.findOne({username})
    res.json({users: getUsers})
}

profileHandler.deleteUser = async (req, res) => {
    const username = req.params.username
    await User.findOneAndDelete({username})
    res.json({message: 'Deleted user: ' + username})
}

profileHandler.updateUser = async (req, res, next) => {
    try {
        const username = req.params.username
        const updateObject = req.body
        const getUser = await User.findOne({username})
        if(!getUser) throw new Error("Couldn't find user")
        Object.keys(updateObject).forEach(k => {
            getUser[k] = updateObject[k]
        })
        await getUser.save()
        res.status(200).json({message: "user updated"})
    } catch (error) {
        return next({
            status: 400,
            message: error.message || 'Error updating user'
        }) 
    }
}

module.exports = profileHandler