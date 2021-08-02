const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const consts = require('../consts');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async function(req, res) {
        try {
            let usuario = await UserModel.findOne({ email: req.body.email });
            if(!usuario) {
                const user = new UserModel(req.body);
                user.password = bcrypt.hashSync(user.password, consts.bcryptSalts);
                await user.save();
                delete user.password;
                res.status(200).json(user);
            }     
            else {
                res.status(403).json({ message: 'Email already registered', error: {} });
            }       
        } catch (error) {
            res.status(500).json({ message: 'Error while saving the user', error: e })
        }
    },
    login: function(req, res) {
        const password = req.body.password;
        const email = req.body.email;

        UserModel.findOne({ email: email }).lean().exec((err, user) => {
            if(err) {
                return res.status(500).json({
                    message: 'Server error',
                    error: err
                });
            }
            const auth_error = (password == '' || password == null || !user);

            if (!auth_error) {
                if (bcrypt.compareSync(password, user.password)) {
                    let token = jwt.sign({ _id: user._id }, consts.keyJWT, { expiresIn: consts.expiresJWT });
                    delete user.password;
                    return res.json({ ...user, token: token });
                }
            }            
            else {
                return res.status(404).json({
                    message: 'Wrong e-mail or password'
                })
            }
        })
    },
    check_token: function(req, res, next) {
        const token = req.get('Authorization');

        if(!token) {
            return res.status(401).json({ message: 'Token not found' });
        }
        jwt.verify(token, consts.keyJWT, (err, decoded) => {
            if (err || !decoded) {
                return res.status(401).json({ message: 'Wrong token. Authentication error.'});
            }
            else next();
        });
    },
    user_data: function(req, res) {
        const token = req.get('Authorization');
        jwt.verify(token, consts.keyJWT, (err, decoded) => {
            const id = decoded._id;
            UserModel.findById(id).lean().exec((err, user) =>{
                if (err || !user){
                    return res.status(500).json({ message: 'Error when try to fetch user data', error: err});
                }
                let token = jwt.sign({ _id: user._id }, consts.keyJWT, { expiresIn: consts.expiresJWT });
                delete user.password;
                return res.json({ ...user, token: token });
            });
        })
    }
}