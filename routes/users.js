const express = require('express');
const mysql = require('mysql');

var router = express.Router();


router.get('/users', function (req,res,next) {
	res.send('Users');
});


// Database connection
const db = mysql.createConnection({
	host: 'localhost',
	user:  'root',
	password: '',
	database: 'webchat'
});

db.connect((err) => {
	if (err)
	{
		throw err;
	}
	console.log('Mysql connected');
});


// Inserting a user
router.get('/insertuser', (req,res)=>{
	let name = "Ahmed";
	let pass = 123;
	let email = "Ahmed@email.com";
	let sql = "INSERT INTO `users`(`name`, `pass`, `email`) VALUES ('" + name + "'," + pass + ",'" + email + "')";
	// let sql = "INSERT INTO `users`(`name`, `pass`, `email`) VALUES ("Mahmoud",123,"mahmoud@hotmail.com")";
	console.log(sql);
	db.query(sql, (err,result)=>{
		if(err)
		{
			res.send(err);
		}
		res.send('Row inserted');
	});
});


// Verifing a user
router.get('/verifyuser', (req,res)=>{
	let pass = 123;
	let email = "mahmoud@email.com";
	let sql = "SELECT * FROM `users` WHERE email = '" + email + "' and pass = " + pass;
	// let sql = "SELECT * FROM `users` WHERE email = "mahmoud@email.com" and pass = 123";
	console.log(sql);
	db.query(sql, (err,result)=>{
		if(err)
		{
			throw err;
		}
		if (result[0])
		{
			res.send(result[0]);
		}
		else
			res.send("Invalid user");
	});
});

// Get contacts list
router.get('/getcontactlist', (req,res)=>{
	userid = 1;
	let sql = "SELECT * FROM `contactlist` WHERE userid1 = " + userid + " OR userid2 = " + userid;
	// let sql = "SELECT * FROM `contactlist` WHERE userid1 = 1 OR userid2 = 1"
	console.log(sql);
	db.query(sql, (err,result)=>{
		if(err)
		{
			res.send(err);
		}
		res.send(result);
	});
});


// Insert chat
router.get('/insertchat', (req,res)=>{
	userid1 = 2;
	userid2 = 3;
	message = "Hello";
	isattachment = "null";
	let sql = "INSERT INTO `chatHistory`(`userid1`, `userid2`, `message`, `messagetime`, `isattachment`) VALUES (" + userid1 + "," + userid2 + ", '" + message + "', NOW(), " + isattachment + ")";
	// let sql = "INSERT INTO `chatHistory`(`userid1`, `userid2`, `message`, `messagetime`, `isattachment`) VALUES (1,2,"HI",NOW(),null)"
	console.log(sql);
	db.query(sql, (err,result)=>{
		if(err)
		{
			res.send(err);
		}
		res.send(result);
	});
});

// Get chat
router.get('/getchat', (req,res)=>{
	userid1 = 1;
	userid2 = 2;
	message = "Hello";
	isattachment = "null";
	let sql = "SELECT `message`, `messagetime`, `isattachment` FROM `chatHistory` WHERE (userid1 = " + userid1 + " and userid2 = " + userid2 + ") OR (userid1 = " + userid2 + " and userid2 = " + userid1 + ")";
	// let sql = "SELECT `message`, `messagetime`, `isattachment` FROM `chatHistory` WHERE (userid1 = 1 and userid2 = 2) OR (userid1 = 2 and userid2 = 1)"
	console.log(sql);
	db.query(sql, (err,result)=>{
		if(err)
		{
			res.send(err);
		}
		res.send(result);
	});
});

module.exports = router;