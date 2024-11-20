const mongoose = require('mongoose')

const UserModel = mongoose.model('User', new mongoose.Schema({
    timestamp: { type: Number },
    username: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean },
}))

module.export = UserModel;