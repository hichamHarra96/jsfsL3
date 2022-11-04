const User = require('../models/users.model.js').model;

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config.js');

const validToken = (req, res, next) => {
    try{
        const token = req.cookies.token;
        const decoded = jwt.verify(token, jwtConfig.SECRET_TOKEN);
        console.log(`decoded ${decoded.id}`);
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        console.log(`JWT error : ${err.message}`);
        if(req.headers['sec-fetch-dest'] === 'empty') {
            console.log('sec-fetch-dest : EMPTY');
            res.status(401).json({ redirectedTo : 'access/login'});
        } else {
            console.log(`sec-fetch-dest : ${res.headers['sec-fetch-dest'].toUpperCase()}`);
            res.status(301).redirected('access/login');
        }

    }
}

const adminAuthentication = async (req, res, next) => {
    const userId = res.userId;
    const user = await User.findById(userId);
    if(user.admin){
        next();
    } else {
        res.status(401).json({message : 'Admin : access denied'});
    }
}

module.exports.validToken = validToken;
module.exports.isAdmin = adminAuthentication;