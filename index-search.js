var express = require('express');
var pug = require('pug');
var app = express();
var port = 3000;

var users = [
				{id: '1', name: 'kem'},
				{id: '2',name: 'tin'},
				{id: '3',name: 'nam'},
				{id: '4',name: 'tom'}
			]

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res)=>{
	res.render('index-2', {
		name: 'AAA'
	});
});

app.get('/users', (req, res)=>{
	res.render('users/index-2', 
		{users: users});
});

app.get('/users/search', (req, res)=>{
	var q = req.query.q;
	var matchedusers = users.filter((user)=>{
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/search', {users: matchedusers});
});

app.listen(port, ()=>{
	console.log('listen from port:'+port);
});