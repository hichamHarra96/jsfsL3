const express = require('express');
const router = express.Router();

const errorController = require('../controllers/error.controller.js');

router.use(errorController.notFound);

router.use(errorController.handleError);

module.exports = router;