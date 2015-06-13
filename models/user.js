var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var userSchema = new Schema({
    email: String,
    name: String,
    phone_number: String,
    password_hash: String,
    role: String, // admin, normal
    contact_method: String
});

module.exports = mongoose.model('User', userSchema);