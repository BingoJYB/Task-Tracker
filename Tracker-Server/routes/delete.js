let ObjectId = require('mongodb').ObjectID;
let express = require('express');
let router = express.Router();

router.delete('/:id', (req, res, next) => {
    // delete a task, information comes from AJAX request from Angular
    req.app.get('mydb').collection('tasks').remove({
        _id: new ObjectId(req.params.id)
    }, (err, task) => {
        if (err)
            res.send(err);

        // get and return all the tasks after you delete another
        req.app.get('mydb').collection('tasks').find({}).toArray((err, tasks) => {
            if (err)
                res.send(err);

            res.json(tasks);
        });
    });
});

module.exports = router;
