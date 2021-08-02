let ProductModel = require('../models/ProductModel');

module.exports = {
    all: function(req, res){
        ProductModel.find({}).lean().exec(function(err, products){
            if (err) res.json([]);
            else return res.json(products);
        });
    }
};