const express = resuire('express');
const router = express.Router();

const controller = require('../controllers/objectrest.controller');

router.get('/', controller.allObjects);
router.get('/:objectId', controller.getObject );
router.post('/', controller.createObject);
router.put('/:objectId', controller.updateObject);
router.delete('/:objectId', controller.deleteObject);