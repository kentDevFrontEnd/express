var express = require('express');
var router = express.Router();
var shortid = require('shortid');

var db = require('../db');

router.get('/', (req, res)=>{
	res.render('users/index-2', 
		{users: db.get('users').value()});
});

router.get('/search', (req, res)=>{
	var q = req.query.q;
	var matchedusers = db.get('users').value().filter((user)=>{
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/search', {users: matchedusers});
});

router.get('/create', (req, res)=>{
	res.render('users/create')
});

router.get('/:id', (req, res)=>{
	var id = req.params.id;
	var user = db.get('users').find({id: id}).value();
	res.render('users/view', {
		user: user
	});
});

router.post('/create', (req, res)=>{
	console.log(req.body);
	var id = shortid.generate();
	console.log(id);
	 db.get('users')
	 	.push({id: id, name: req.body.name})
	 	.write();
	res.redirect('/users');
});

module.exports = router;