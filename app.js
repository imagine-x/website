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


// Landing Route
// app.get('/', function(req, res){
//     res.render()
// });

app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})

// Post Template
app.post('/post', contactsController.submit);
app.post('/slackCommand', slackController.slackCommand);
// Does the table exist?

// App Start
app.listen(process.env.PORT || 8003);
