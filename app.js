// Server
var express = require('express');
var app = express();

// Sqlite database
var path = require('path');
var databaseService = new(require('./services/databaseService'))(__dirname + '/data/store.db');
var contactsController = new(require('./controllers/contactsController'))(databaseService);
var slackController = new(require('./controllers/slackController'))(databaseService);

// MongoDB
const DB_URL = 'mongodb://localhost:27017/imaginex'
const Mongo = require('mongodb').MongoClient
const NominationRouter = require('./controllers/nomination')

// HTTP handlers
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

Mongo.connect(DB_URL, (err, db) => {
    console.log('Connected to db')
    // outbound http client
    app.use(express.static('dist'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }))

    // route to save contacts, send welcome message
    app.post('/post', (req, res) => contactsController.submit(req, res));
    // route for slack bot that dumps whole list
    app.post('/slackCommand', (req, res) => slackController.slackCommand(req, res));
    // route to serve static vue app
    NominationRouter(app,db)

    app.get('/*', function(req, res) {
      console.log('Serving index.html')
      res.sendFile(path.join(__dirname, '/dist/index.html'))
    })

    app.listen(process.env.PORT || 8003)
})
