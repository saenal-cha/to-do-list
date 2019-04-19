var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/vuenodedb").then(
    () => {
        console.log('Database connection is successful')
    },
    err => {
        console.log('Error when connecting to the database' + err)
    }
);

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});





// Creating Express Routes

var Todo = require('./models/Todo');
var router = express.Router();

app.use('/api', router);

router.route('/create').post((req, res) => {
    var todo = new Todo(req.body);
    todo.save().then( todo => {
        res.status(200).json({'message': 'Todo successfully added '});
    }).catch( err => {
        res.status(400).send("Error when saving to database");
    });
});

router.route('/todos').get((req, res) => {
    Todo.find((err, todos) => {
        if(err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

router.route('/todos/:id').get((req, res) => {
    var id = req.params.id;
    Todo.findById(id, (err, todo) => {
        res.json(todo);
    });
});

router.route('/todos/:id').put((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(!todo)
            return next(new Error('Error getting the todo!'));
        else {
            todo.name = req.body.name;
            todo.save().then( todo => {
                res.json('Todo updated successfully');
            }).catch(err => {
                res.statsu(400).send("Error when updating the todo");
            });
        }
    });
});

router.route('/todos/:id').delete((req, res) => {
    Todo.findByIdAndRemove({_id: req.params.id}, (err, todo) => {
        if(err) res.json(err);
        else res.json('Todo successfully removed');
    });
});



















