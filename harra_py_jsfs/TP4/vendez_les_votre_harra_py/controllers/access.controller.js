const bcrypt = require('bcrypt');
const User = require('../models/users.model').model;

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const registerForm = (_, res) => res.redirect('/register.html');

const register = async (req, res) => {

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    console.log(`register , body.admin : ${req.body.admin}`);

    try {
        const userData = {
                            ...req.body,
                            password : hashPassword
                        };
        const newUser = await User.create(userData);
        delete userData.password;
        console.log('user created');
        res.status(201).json(userData);
    }
    catch(err){
        console.log(`error : ${err.message}`);
        res.status(409).json({ message : err.message });
    }
}

const loginForm = (_,res) => res.redirect('/login.html');

/*
Recherche de l'existence d'un user avec ce mdp 
Si oui, on crée un jeton JWT et on le renvoie
*/
const login = async (req,res) => {
    try {
        const user = await User.findOne( { login : req.body.login } );

        if(user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword){
                return res.status(401).json( { message : 'incorrect password' } );
            }
            const token = jwt.sign({id : user._id}, jwtConfig.SECRET_TOKEN, {expiresIn : '6000s'});
            //console.log(`token : ${token}`);
            console.log('login : ' + req.body.login);
            res.cookie('token', token, {maxAge : 60000, httpOnly: true, sameSite : 'strict' });
            res.status(200).json({message : `user connected`, username : req.body.login});
        } else {
            console.log(`unknown user : ${req.body.login}`);
            res.status(401).json({ message : `unknown user : ${req.body.login}`});
        }
    }
    catch(err) {
        console.log(`connexion problem ${err.message}`);
        res.status(500).redirect('access/register');
    }
} 

const logout = (req,res) => {
    res.cookie('token', '', { maxAge : 2000, httpOnly: true, sameSite : 'strict' });
    res.status(200).json({ message : 'user disconnected' });
}

const userForm = (_, res) => res.redirect('/user.html');

const user = async (req,res) => {
    console.log(req);
} 

module.exports.user = user;
module.exports.userForm = userForm; 
module.exports.login = login;
module.exports.loginForm = loginForm;
module.exports.register = register;
module.exports.registerForm = registerForm;
module.exports.logout = logout;