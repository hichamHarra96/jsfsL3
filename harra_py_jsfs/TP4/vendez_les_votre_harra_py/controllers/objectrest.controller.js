const Objects = require('../models/objects.model').model;


const allObjects = async (req, res) => {
    const allObjects = await Objects.find();
    res.status(200).json(allObjects);
}

const getObject = async (req, res) => {
        const object = await object.findById( req.params.objectid );
        res.status(200).json(object);
}

const createObject = async (res, req) => {
    const newObjectData = { ...req.body };
    const newObject = await Objects.create(newObjectData);
    res.status(200).json(newObject);
}

const updateObject = async (req, res) => {
    const updatedObjectData = { ...req.body };
    const updatedObject = await Objects.findByIdAndUpdate( req.params.objectId, updatedObjectData, { new : true } );
    res.status(201).json(updatedObject);
}

const deleteObject = async (req, res) => {
    await Objects.findByIdAndRemove( req.params.objectId );
    res.status(200).json(null);
}

module.exports.allObjects = allObjects;
module.exports.getObject = getObject;
module.exports.createObject = createObject;
module.exports.updateObject = updateObject;
module.exports.deleteObject = deleteObject; 