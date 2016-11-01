// Server
var express = require('express');
var app = express();

// Sqlite database
var path = require('path');
var fs = require('fs');
var file = __dirname + "/data/store.db";
var exists = fs.existsSync(file);
if(!exists) {
  console.log("Creating DB file.");
  fs.openSync(file, "w");
}
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

// HTTP handlers
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var sql_error = function(command, inserts, content) {
    console.error("SQL Error")
    console.error(command);
    console.error(inserts);
    console.error(content);
}

function execute(query, inserts, callback){

    var params = [];
    if(Object.keys(inserts).length > 0) {
        var index = 1;
        query = query.replace(/\{(\w+)\}/g, function (txt, key) {
            params.push(inserts[key]);
            return "$" + index++;
        });
    }
    db.run(query, params, function(err, result) {
        if(err) {
            sql_error(query, inserts, err);
            if (callback) callback(err);
        } else if (callback) {
            callback(err, result, result);
        } else {
            console.log("No callback", query);
        }
    });
}

app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})

// Post Template
app.post('/post', function(req, res){
    console.log('/post', req.body)

    var timestamp = Date.now();
    var name = req.body.name;
    var email = req.body.mail;
    var postal_code = req.body.postal.toLowerCase();
    var subscribed = req.body.subscribe;

    console.log({
      name:name,
      email:email,
      postal_code:postal_code,
      subscribed: subscribed,
    })

    var error = [];
    if (name.match(/[/\\()~!@#$%^&*+-;|<>"'_]/)){
        error.push('name');
    }
    if (!email.match(/^\w+\.?\w+?\@\w+\.(\w+\.)?\w+$/)){
        error.push('email');
    }
    //optional
    // if (!postal_code.match(/^[a-z]\d[a-z]\s?\d[a-z]\d$/)){
    //     error.push('postal_code');
    // }
    if(error.length > 0){
        res.send({ok: false, data:error});
    }
    else {
        var query = 'INSERT INTO first_form (timestamp, name, email, postal_code, subscribed) VALUES ({timestamp}, {name}, lower({email}), upper({postal_code}), {subscribed})';
        var insert = { 'timestamp': timestamp, 'name': name, 'email': email, 'postal_code': postal_code, 'subscribed': subscribed };
        execute(query, insert, function(){
            res.send({ok: true});
        });
    }

});

// Does the table exist?
db.get("SELECT count(*) AS found FROM sqlite_master WHERE type='table' AND name='first_form'",function(err,row){
    if (row.found == 0) { // not found, create the first instance
        execute("create table first_form(timestamp, name, email, postal_code, subscribed)",{})
    }
});

// App Start
app.listen(process.env.PORT || 8003);
