const Objects = require('../models/objects.model').model;

const list = async (req, res) => {
    const allObjects =  await Objects.find();
    res.render('index',
                {
                    title : 'Objects list',
                    objects : allObjects
                });
}

const createObjet = async (req, res, _) => {
    const newObjData = { ...req.body };
    try {
        const createdObject = await Objects.create(newObjData);
        res.status(201).json(createdObject);
    }
    catch(error) {
        res.status(400).json(error);
    }
} 

const createObjetForm = (_, res) => res.redirect('/createObjet.html');

module.exports.list = list;
module.exports.createObjet = createObjet;
module.exports.createObjetForm = createObjetForm;

