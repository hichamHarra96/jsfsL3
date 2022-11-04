var express = require('express');
var router = express.Router();

const authMiddleware = require('../middlewares/authentication.middlewares.js');

const userController = require('../controllers/user.controller.js');


router.get('/', userController.me);
router.get('/me', authMiddleware.validToken, userController.me);
router.put('/me', authMiddleware.validToken, userController.update);

module.exports = router;
