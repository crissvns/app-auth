let express = require('express');
let router = express.Router();

let PersonController = require('../controllers/PersonController');
let ProductController = require('../controllers/ProductController');
let AuthController = require('../controllers/AuthController')

router.use(AuthController.check_token);

router.get('/people', PersonController.all);
router.get('/products', ProductController.all);

module.exports = router;