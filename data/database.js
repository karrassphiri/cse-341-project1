const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initiated');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL) // Fixed the typo in the URL
        .then((client) => {
            database = client.db(); // Use client.db() to get the database instance
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initiated');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};
