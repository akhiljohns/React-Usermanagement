import mongoose, { Schema } from "mongoose";



const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image:{
        type: String
    }
})

const userModel = mongoose.model('User', userSchema)


export default userModel