var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var userSchema = new Schema({
    name: String,
    email: String,
    phoneNumber: String,
    passwordHash: String,
    preferences: Schema.Types.Mixed
});

module.exports = mongoose.model('User', userSchema);