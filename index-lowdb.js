var express = require('express');
var bodyParser = require('body-parser')
var pug = require('pug');
var shortid = require('shortid');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);
var app = express();
var port = 3000;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

db.defaults({ users: [] })
  .write()

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res)=>{
	res.render('index-2', {
		name: 'AAA'
	});
});

app.get('/users', (req, res)=>{
	res.render('users/index-2', 
		{users: db.get('users').value()});
});

app.get('/users/search', (req, res)=>{
	var q = req.query.q;
	var matchedusers = db.get('users').value().filter((user)=>{
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/search', {users: matchedusers});
});

app.get('/users/create', (req, res)=>{
	res.render('users/create')
})

app.get('/users/:id', (req, res)=>{
	var id = req.params.id;
	var user = db.get('users').find({id: id}).value();
	res.render('users/view', {
		user: user
	});
})

app.post('/users/create', (req, res)=>{
	console.log(req.body);
	var id = shortid.generate();
	console.log(id);
	 db.get('users')
	 	.push({id: id, name: req.body.name})
	 	.write();
	res.redirect('/users');
})

app.listen(port, ()=>{
	console.log('listen from port:'+port);
});