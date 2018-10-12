let createError = require('http-errors');
let express = require('express');
let path = require('path');
let mongoClient = require('mongodb').MongoClient;

let getRouter = require('./routes/get');
let createRouter = require('./routes/post');
let deleteRouter = require('./routes/delete');

let app = express();

// Set up database
mongoClient.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true}, (err, db) => {
    if (err) throw err;

    let mydb = db.db('mydb');
    app.set('mydb', mydb);

    mydb.createCollection('tasks', (err, res) => {
        if (err) throw err;
        console.log('Database Connected!');
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Cross Origin middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/tracker/api/v1/get_tasks', getRouter);
app.use('/tracker/api/v1/create_task', createRouter);
app.use('/tracker/api/v1/delete_task', deleteRouter);

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
