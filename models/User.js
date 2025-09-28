const { type } = require('jquery');
const mongoose = require('mongoose');
const bycrpt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type :String ,
        required:true ,
    },
    password: {
        type : String ,
        required: true ,
    },
    avatar:{
        type: String ,
        required: true 
    }
})
UserSchema.methods.hasPassword = (password)=>{
    return bycrpt.hashSync(password,bycrpt.genSaltSync(10))
}
UserSchema.methods.comparePasswords = (password , hash) => {
    return bycrpt.compareSync(password,hash)
}
let User = mongoose.model('User', UserSchema , 'users');

module.exports = User