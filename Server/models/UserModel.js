let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    'firstname': String,
    'lastname': String,
    'address': String,
    'city': String,
    'state': String,
    'phone': String,
    'mobilephone': String,
    'email': String,
    'password': String
});

module.exports = mongoose.model('User', UserSchema);