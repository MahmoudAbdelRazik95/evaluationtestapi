const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');


const app = express();


// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


// set static folder (angular stuff)
app.use(express.static(path.join(__dirname, '/home/mahmoudabdelrazek/Desktop/WebChat')));


app.use('/', index);
app.use('/api', users);

app.listen('3000', () => {
	console.log('Server started at port 3000');
});