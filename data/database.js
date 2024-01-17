const dotenv = require('dotenv');  // The first two lines are accessing the .env file
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initiated');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URI) 
        .then((client) => {
            database = client; 
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!database) {
        throw Error('Database not initiated');
    }
    return database;
};

module.exports = {
    initDb,
    getDb
};
