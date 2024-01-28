const mongodb = require('./data/database');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());   // This will make create user function to work
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

const studentRouter = require('./routes/students'); // added for the "student" collection
const teacherRouter = require('./routes/teachers'); // added for the "teacher" collection

app.use('/students', studentRouter); // added for the "student" collection
app.use('/teachers', teacherRouter); // added for the "teacher" collection

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node Running on port ${port}`);
        });
    }
});
