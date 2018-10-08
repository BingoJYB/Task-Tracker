let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let mongoClient = require('mongodb').MongoClient;

let getRouter = require('./routes/get');
let createRouter = require('./routes/post');

let app = express();

// Set up database
let mydb;
mongoClient.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true}, (err, db) => {
    if (err) throw err;

    mydb = db.db('mydb');
    app.set('mydb', mydb);

    mydb.createCollection('tasks', (err, res) => {
        if (err) throw err;
        console.log('Database Connected!');
    });
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tracker/api/v1/get_tasks', getRouter);
app.use('/tracker/api/v1/create_task', createRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
