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
	var queryParams = req.query;
	var filteredTodos = todos;

	if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
		filteredTodos = _.where(filteredTodos,{completed:true});
	} else if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'false'){
		filteredTodos = _.where(filteredTodos,{completed:false});
	}

	if(queryParams.hasOwnProperty('q')){
		filteredTodos = _.filter(filteredTodos,function (todo){
			return todo.description.indexOf(queryParams.q) > -1;
		});
	}

	res.json(filteredTodos);
});

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
});

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
});

// DELETE /todos/:id
app.delete('/todos/:id',function (req, res){
	var todoId = parseInt(req.params.id,10);
	var match;
	match = _.findWhere(todos,{id:todoId});
	
	if(!match){
		res.status(404).json({"error":"No todo found with that id"});
	}else{
		todos = _.without(todos,match);
		res.json(match);
	}
});

// PUT /todos/:id
app.put('/todos/:id',function (req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if (!matchedTodo) {
		return res.status(404).send();
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	}

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}

	_.extend(matchedTodo, validAttributes);
	res.json(matchedTodo);
});



//Setting port and listenning
app.listen(PORT, function (){
	console.log('Express listenning on port '+PORT+'!');
});


