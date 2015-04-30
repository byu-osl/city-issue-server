var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String
});

module.exports = mongoose.model('User', userSchema);