const PORT = 9000;
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());

app.use(session({
	secret: 'wild-cat',
	saveUninitialized: true
}));


app.use(
	'/',
	express.static(__dirname + '/app')
);

let users = {};

app.get('/session', function(req, res){
	console.log(req.session.id);
	console.log(req.query.item);
	if(users[req.session.id]===undefined){
		users[req.session.id] = [];
		console.log('session added');
	}
	else{
		console.log('session already exists');
		console.log(users[req.session.id]);
	}
	res.send(users[req.session.id]);

});

app.get('/add', function(req, res){
	console.log('1 start add request');
	console.log('2',users[req.session.id]);
	console.log('3',req.session.id);
	if(users[req.session.id]===undefined){
		users[req.session.id] = [];
		console.log('session added');
		console.log('item added');
	}
	users[req.session.id].push(req.query.item);
	res.send(users[req.session.id]);
});


app.get('/delItem',function(req,res){
	users[req.session.id].splice(req.query.index,1);
	res.send(users[req.session.id]);
})
//
// app.get(
// 	'/',
// 	express.static(__dirname + '/app'),
// 	(req, res) => {
// 		req.session.counter = req.session.counter || 0;
// 		req.session.counter++;
// 	});

app.listen(PORT);

console.log(`
	-----------------------------
	| The root folder is: '/app'
	| You can access the application at: http://localhost:${PORT}
	------------------------------------------`);
