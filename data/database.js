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

    const connectionString = process.env.MONGODB_URI;
    if (!connectionString) {
        return callback('MONGODB_URI is not set in environment variables');
    }

    console.log('Connecting to MongoDB:', connectionString);

    MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            database = client.db();
            console.log('Connected to MongoDB');
            callback(null, database);
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
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
