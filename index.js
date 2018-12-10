const express =  require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./taskSchema.js');
const app = express();
const PORT = 1337;

mongoDB = 'mongodb://localhost/todo-list';
mongoose.connect(mongoDB);
const db = mongoose.connection;

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

db.on('error', () => console.log('error connecting to mongodb'));
db.on('open', () => console.log('MongoDB successfully connected'));

// app.get('/', (req, res) => res.send('Hello This is working'));
app.get('/task/:id', (req, res) => {
  //TODO: Given a task id, return the task to client
  const id = req.params.id;
  Task.findById (id).then((task) => {
    if (!task) {
      return res.send('Task does not exist');
    }
    return res.send(task);
  }).catch((err) => {
    return res.status(500).send(err);
  })
});

app.get('/task', (req, res) => {
  //TODO: Return all tasks to client
  Task.find ({}).then( (taskList) => {
    if (taskList.length < 1) {
      return res.send('Tasks list is empty');
    }
    return res.send(taskList);
  })
});

app.post('/task', (req, res) => {
  // TODO: Create a new task
  const { title, description } = req.body;
  if (!title || !description) {
    return res.send('Error! Please provide title and description');
  }
  //create new task
  const newTask = new Task({
    title,
    description,
    isComplete: false
  });
  newTask.save()
    .then((task) => {
      res.send(task);
      return;
    });
});

app.put('/task/:id', (req, res) => {
  // TODO: Edit a task based on an ID;
  const id = req.params.id;
  const { title, description } = req.body;
  if (!title || !description) {
    return res.send('Error! Please provide title and description');
  }
  Task.findByIdAndUpdate (id, {title, description}).then((task) => {
    return res.send(task);
  })
});

app.delete('/task/:id', (req, res) => {
  // TODO: remove a task based on an ID;
  const id = req.params.id;
  Task.findByIdAndDelete (id).then((task) => {
    return res.send(task);
  })
});

app.put('/complete-task/:id', (req, res) => {
  // TODO: mark a task as complete
  const id = req.params.id;
  Task.findByIdAndUpdate (id, {isComplete:true}).then((task) => {
    return res.send(task);
  })
});


app.listen(PORT, () => console.log(`listening on port ${PORT}`));

