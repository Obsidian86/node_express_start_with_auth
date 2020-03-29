const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    created_at: { 
        type: Date,
        required: true,
        default: Date.now 
    },
    email: {
        type: String,
        unique: true,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    user_type:{
        type: String,
        required: true,
        default: "user"
    }
})

userSchema.pre('save', async function(next){
    try {
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, 10)
        }
        return next()
    } catch (error) { return next(error) }
})

module.exports = mongoose.model('User', userSchema)