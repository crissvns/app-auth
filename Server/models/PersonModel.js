let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PersonSchema = new Schema({
    'name': String,
    'country': String,
    'email': String,
    'company': String
});

module.exports = mongoose.model('Person', PersonSchema);