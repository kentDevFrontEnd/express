var express = require('express');
var pug = require('pug');
var app = express()
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res)=>{
	res.render('index-2', {
		name: 'AAA'
	});
});

app.get('/users', (req, res)=>{
	res.render('users/index-2', {
		users: [
			{name: 'kent'},
			{name: 'hai'},
			{name: 'tam'}
		]
	})
});

app.listen(port, ()=>{
	console.log('listen form port:'+port);
});