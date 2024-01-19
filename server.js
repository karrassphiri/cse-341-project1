const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 8080;

const usersRouter = require('./routes/users'); //added for Mongodb
app.use('/users', usersRouter); //added for Mongodb

app.use(bodyParser.json());   //This will make create user function to work
app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node Running on port ${port}`);
        });
    }
});
