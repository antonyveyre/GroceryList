const PORT = 9000;
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');

let users = [];

function User(id,name) {
  this.id = id;
  this.name = name;
  this.items = [];
}

function Item(text) {
	this.text = text;
  this.checked = false;
}


app.use(cookieParser());
app.use(session({
	secret: 'wild-cat',
	saveUninitialized: true
}));


app.use(
	'/',
	express.static(__dirname + '/app')
);


app.get('/session', function(req, res){
	console.log(req.session.id);
	console.log('req query item',req.query.userName);
	let usr = users.find(o => o.id == req.session.id);
	console.log('user on server'+usr);
	if (usr===undefined&&req.query.userName=='undefined') {
		console.log(' if session');
		res.send('nameRequest');
	}
	else if(usr===undefined){
		console.log('else if in session');
		console.log('user name in else if ' +  req.query.userName);
		let newUser = new User(req.session.id,req.query.userName)
		users.push(newUser);
		res.send(newUser)
		console.log(users);
	}
	else{
		console.log('session already exists');
		console.log(users[req.session.id]);
		let usrres = users.find(o => o.id === req.session.id)
		console.log(usrres);
		res.send(usrres);
	}
});


app.get('/add', function(req, res){
	// console.log('1 start add request');
	// console.log('2',users[req.session.id]);
	// console.log('3',req.session.id);
	// if(users[req.session.id]===undefined){
	// 	users[req.session.id] = [];
	// 	console.log('session added');
	// 	console.log('item added');
	// }
	// // users.find(o => o.id == req.session.id).items.push(req.query.item);
	console.log(users);
	let usrrespadd = users.find(o => o.id == req.session.id)
	usrrespadd.items.push(new Item(req.query.item));
	console.log(usrrespadd);
	console.log(users);
	res.send(usrrespadd.items);
});


app.get('/chngItem',function(req,res){
	let usrChk = users.find(o => o.id == req.session.id);
	console.log('usrChk', usrChk);
	let itm2cng = usrChk.items.find(i => i.text == req.query.title)
	console.log(itm2cng);
	itm2cng.checked = !itm2cng.checked;
	// usrChk.items[req.query.index].checked = !usrChk.items[req.query.index].checked;
	res.send(usrChk.items);
})


app.get('/delItem',function(req,res){
	let usrDel = users.find(o => o.id == req.session.id)
	let itm2cng = usrDel.items.find(i => i.text == req.query.title)
	let indexToPop = usrDel.items.indexOf(itm2cng);
	usrDel.items.splice(indexToPop,1)
	// users[req.session.id].splice(req.query.index,1);
	res.send(usrDel.items);
})


app.get('/logoff',function(req,res){
	let usrLogoff = users.find(o => o.id == req.session.id)
	users.splice(users.indexOf(usrLogoff),1)
	res.send('logout');
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
