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
  let usr = users.find(o => o.id == req.session.id);
  if (usr===undefined&&req.query.userName=='undefined') {
    res.send('nameRequest');
  }
  else if(usr===undefined){
    let newUser = new User(req.session.id,req.query.userName)
    users.push(newUser);
    res.send(newUser)
  }
  else{
    let usrres = users.find(o => o.id === req.session.id)
    res.send(usrres);
  }
});


app.get('/add', function(req, res){
  let usrrespadd = users.find(o => o.id == req.session.id)
  if (usrrespadd){
    usrrespadd.items.push(new Item(req.query.item));
    res.send(usrrespadd.items);
  }
  else {
    res.sendStatus(500);
  }
});


app.get('/chngItem',function(req,res){
  let usrChk = users.find(o => o.id == req.session.id);
  let itm2cng = usrChk.items.find(i => i.text == req.query.title)
  itm2cng.checked = !itm2cng.checked;
  res.send(usrChk.items);
})


app.get('/delItem',function(req,res){
  let usrDel = users.find(o => o.id == req.session.id)
  let itm2cng = usrDel.items.find(i => i.text == req.query.title)
  let indexToPop = usrDel.items.indexOf(itm2cng);
  console.log('title',req.query.title);
  console.log('usrdel',usrDel);
  console.log('itm2chng',itm2cng);
  console.log('indexToPop',indexToPop);

  usrDel.items.splice(indexToPop,1)
  res.send(usrDel.items);
})


app.get('/logoff',function(req,res){
  let usrLogoff = users.find(o => o.id == req.session.id)
  users.splice(users.indexOf(usrLogoff),1)
  res.send('logout');
})

app.listen(PORT);

console.log(`
  -----------------------------
  | The root folder is: '/app'
  | You can access the application at: http://localhost:${PORT}
  ------------------------------------------`);
