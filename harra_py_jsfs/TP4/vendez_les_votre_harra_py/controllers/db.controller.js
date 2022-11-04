const mongoose = require('mongoose');

const dbURI = require('../config/db.config.js').DB_URI;
const options = {
    useNewUrlParser : true,
    useUnifiedTopology : true
};
const dbConnection = mongoose.createConnection(dbURI, options);

module.exports = dbConnection;

dbConnection.on('connected', () => {
    console.log(`db.controller.js : connected to ${dbURI}`);
});
dbConnection.on('disconnected', () => {
    console.log(`db.controller.js : disconnected from ${dbURI}`);
});
dbConnection.on('error', () => {
    console.log(`dbConnection.controller.js : error on ${dbURI}`);
});

//fermeture propre de la connexion
const shutdown = (msg, callback) => {
    dbConnection.close( () => {
        console.log(`Mongoose shutdown : ${msg}`);
        callback();
    });
}

//Gestion du CTRL+C pour arrêter l'application  
process.on('SIGINT', () => shutdown('application ends', () => process.exit(0)) );
process.on('SIGTERM', () => shutdown('SIGTERM received', () => process.exit(0)) );
