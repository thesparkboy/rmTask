const express 		= require("express");
const bodyparser  	= require("body-parser");
const mongoose		= require("mongoose");
const path 		= require('path');
const cookieParser 	= require('cookie-parser');
const logger 		= require('morgan');
const app 		= express();
require('./passport');

const PORT = 3000;
const SERVER_UP_MESSAGE = "server is running at 3000";
const INDEX_FILE_PATH = '/frontend/index.html';


var routes = require('./routes/route');

mongoose.connect("mongodb://a:a@cluster0-shard-00-00-04d6p.mongodb.net:27017,cluster0-shard-00-01-04d6p.mongodb.net:27017,cluster0-shard-00-02-04d6p.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/', routes);

app.get('*', function(req, res) {
    res.sendFile(__dirname+INDEX_FILE_PATH);
})

app.listen(PORT, function(req, res) {
	console.log(SERVER_UP_MESSAGE);
});
