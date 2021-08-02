let mongoose = require('mongoose');
let faker = require('faker')
let ProductModel = require('../models/ProductModel')

mongoose.connect('mongodb://localhost:27017/auth_test', { useNewUrlParser: true });

async function add(n) {
    try {
        for(let i = 0; i < n; i++) {
            const p = new ProductModel();
            p.name = faker.commerce.productName();
            p.departmet = faker.commerce.department();
            p.price = faker.commerce.price();
            await p.save();
        }        
    } catch (error) {
        console.log(error)        
    }
}


add(100)
.then(()=>{
    console.log('OK');
    mongoose.disconnect();
})