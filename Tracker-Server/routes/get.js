let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    // use mongodb to get all tasks in the database
    req.app.get('mydb').collection('tasks').find({}).toArray((err, tasks) => {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(tasks); // return all tasks in JSON format
    });
});

module.exports = router;
