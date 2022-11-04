const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authentication.middlewares.js');
const indexController = require('../controllers/index.controller.js');
const objectController = require('../controllers/object.controller.js');

router.get('/',/* authMiddleware.validToken,*/ objectController.list);
router.get('/about', indexController.about);
router.get('/adminonly', authMiddleware.validToken, authMiddleware.isAdmin, indexController.adminonly);

module.exports = router;
