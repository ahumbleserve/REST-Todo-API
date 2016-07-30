var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [
	{
		id:1,
		description:'Meet mom for lunch',
		completed:false
	},
	{
		id:2,
		description:'Go to market',
		completed:false
	},
	{
		id:3,
		description:'Study to node.js course today!',
		completed:true
	}
]

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
	
	todos.forEach(function(todo){
		if(todoId === todo.id){
			match = todo;
		}
	});

	if(match){
		res.json(match);
	} else{
		res.status(404).send();
	}
	//res.send(todos[]);
})


//Setting port and listenning
app.listen(PORT, function (){
	console.log('Express listenning on port '+PORT+'!');
});


