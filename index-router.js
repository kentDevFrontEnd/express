var express = require('express');
var bodyParser = require('body-parser')
var pug = require('pug');

var userRouter = require('./routers/user.router');
var app = express();
var port = 3000;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res)=>{
	res.render('index-2', {
		name: 'AAA'
	});
});

app.use('/users', userRouter);

app.listen(port, ()=>{
	console.log('listen from port:'+port);
});