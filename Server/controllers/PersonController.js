let PersonModel = require('../models/PersonModel');

module.exports = {
    all: function(req, res){
        PersonModel.find({}).lean().exec(function(err, people){
            if (err) res.json([]);
            else return res.json(people);
        });
    }
};