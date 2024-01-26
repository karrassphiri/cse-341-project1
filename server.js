const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());   //This will make create user function to work
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
const usersRouter = require('./routes/users'); //added for Mongodb
//const studentRouter = require('./routes/student'); //added for Mongodb

app.use('/users', usersRouter); //added for Mongodb
//app.use('/student', studentRouter); //added for Mongodb

app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
        process.exit(1); // Exit the process if database initialization fails
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node Running on port ${port}`);
        });
    }
});
