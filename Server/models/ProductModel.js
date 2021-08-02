let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    'name': String,
    'department': String,
    'price': Number
});

module.exports = mongoose.model('Product', ProductSchema);