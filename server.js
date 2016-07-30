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
	res.send(todos[req.id]);
})


//Setting port and listenning
app.listen(PORT, function (){
	console.log('Express listenning on port '+PORT+'!');
});


