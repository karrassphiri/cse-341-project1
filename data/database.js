// database.js

const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initiated');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            database = client.db(); // Corrected to use `db` function
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
