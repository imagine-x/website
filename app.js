// Server
var express = require('express');
var app = express();

// Sqlite database
var path = require('path');
var databaseService = new (require('./services/databaseService'))(__dirname + '/data/store.db');
var contactsController = new (require('./controllers/contactsController'))(databaseService);
var slackController = new (require('./controllers/slackController'))(databaseService);

// HTTP handlers
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

// outbound http client
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route to save contacts, send welcome message
app.post('/post', (req, res) => contactsController.submit(req, res));
// route for slack bot that dumps whole list
app.post('/slackCommand', (req, res) => slackController.slackCommand(req, res));
// route to serve static vue app
app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})

// App Start
app.listen(process.env.PORT || 8003);
