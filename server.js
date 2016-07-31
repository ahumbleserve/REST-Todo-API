var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/',function (req, res){
	res.send('Todo API Root');
})

// GET /todos
app.get('/todos',function (req, res){
	res.json(todos);
})

// GET /todos/:id
app.get('/todos/:id',function (req, res){
	var todoId = parseInt(req.params.id,10);
	var match;
	match = _.findWhere(todos,{id:todoId});
	
	if(match){
		res.json(match);
	} else{
		res.status(404).send();
	}
	//res.send(todos[]);
})

// POST /todos
app.post('/todos',function (req, res){
	var body  = req.body;
	var todo = _.pick(body, 'description', 'completed');
	if(!_.isBoolean(todo.completed) || !_.isString(todo.description || todo.description.trim().length === 0)){
		return res.status(400).send();
	}

	todo.description = todo.description.trim();

	todo.id = todoNextId++;
	todos.push(todo);
	res.json(todo);
})


//Setting port and listenning
app.listen(PORT, function (){
	console.log('Express listenning on port '+PORT+'!');
});


