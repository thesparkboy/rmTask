var express 		= require("express");
var bodyparser  	= require("body-parser");
var mongoose		= require("mongoose");
var path 			= require('path');
var cookieParser 	= require('cookie-parser');
var logger 			= require('morgan');
var app 			= express();
require('./passport');

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
    res.sendFile(__dirname+'/frontend/index.html');
})

app.listen(3000, function(req, res) {
	console.log('server is running at 3000');
});
