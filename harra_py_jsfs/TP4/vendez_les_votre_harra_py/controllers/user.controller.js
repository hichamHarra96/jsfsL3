const User = require('../models/users.model.js').model;

const details = (req, res) => {
    const user = User.findById(req.userId);
    if(user){
        res.status(200).json(user);
    } 
    else {
        res.status(401).json({message : `user ${req.userId} not found`});
    } 
}
module.exports.details = details;  

module.exports.home = (_,res) => res.redirect('/user.html');

const me = async (req, res) => {
    const user = await User.findById(req.userId);
    console.log(user);
    console.log(req.userId);
    res.status(200).json({ name : user.name, id : req.userId , money : user.money });
}

module.exports.me = me;

module.exports.update = 
    async (req,res) => {
        const updatedData = { ...req.body };
        console.log(updatedData);
        const user = await User.findByIdAndUpdate(req.userId, 
                                                    updatedData,
                                                    {new : true});
        res.status(200).json({ name : user.name, message : 'update success' });
    }