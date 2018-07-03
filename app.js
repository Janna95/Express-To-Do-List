const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let toDoList = [];
let id = 0;
app.get('/', (req, res) => {
    //res.send("i'm wооorking");
    //console.log(toDoList);
    res.render('createToDo', {
        title: 'ToDoList',
        toDoList: toDoList
    });
})

app.post('/', (req, res) => {

    if(!req.body.input) {
        res.render('createToDo', { msg: 'ToDo is Empty' });
    }
    else {
        req.body.id = id++;
        toDoList.push(req.body);
    console.log(toDoList);
        res.render('createToDo', {
            toDoList: toDoList
        })
    }
});

app.get('/edit/:id', (req, res) => {
    res.render('edit', {
        id: req.params.id
    });
});


app.post('/edit/:id', (req, res) => {
    
    let current_id = req.params.id;
    let newText = req.body.edited;
    console.log(current_id)
    let filtered = toDoList.filter((todo) => {
        return todo.id == current_id
    });
    filtered[0].input = newText;

    res.redirect('/')
})


app.post('/delete/:id', (req, res) => {
    toDoList.splice(req.params.id, 1);
    res.redirect('/')
}) 

app.get('*', (req, res) => res.end('404') )
app.listen(3000);
