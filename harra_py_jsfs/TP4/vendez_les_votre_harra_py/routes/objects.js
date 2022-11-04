const express = require('express');
const router = express.Router();

const objectController = require('../controllers/object.controller');

router.get('/', objectController.list);

router.get('/create', objectController.createObjet);
router.post('/create', objectController.createObjet);

module.exports = router;