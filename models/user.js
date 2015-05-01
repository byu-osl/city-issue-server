var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    passwordHash: String
});

module.exports = mongoose.model('User', userSchema);