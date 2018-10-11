let express = require('express');
let router = express.Router();

router.post('/', (req, res, next) => {
    // create a task, information comes from AJAX request from Angular
    req.app.get('mydb').collection('tasks').insertOne({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description
    }, (err, task) => {
        if (err)
            res.send(err);

        // get and return all the tasks after you create another
        req.app.get('mydb').collection('tasks').find({}).toArray((err, tasks) => {
            if (err)
                res.send(err);

            res.json(tasks);
        });
    });
});

module.exports = router;
