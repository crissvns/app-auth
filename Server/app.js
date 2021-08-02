let express = require('express');
let bodyparser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');
let app = express();
let api = require('./routes/api')
let auth = require('./routes/auth')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/auth_test', { useNewUrlParser: true });

app.use('/api', api);
app.use('/auth', auth);

app.use(function(req,res){
    res.status(404).send('Not found');
});

app.listen(3200, () => {
    console.log('Servidor online na porta 3200');
});