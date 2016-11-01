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

// outbound http client
var https = require('https');

var isProduction = (process.env.PRODUCTION == 'true');
var mailApiKey = process.env.MAILAPIKEY || '';
// if not in production, send to dev test mailing list
var mailList = isProduction ? '7e7fb31eaa' : '1194bbe271';

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

function mailAPI (path, payload, callback) {
    var req = https.request({
                      "headers": {  "Authorization" : 'Basic ' + mailApiKey,
                                    'Content-Length': Buffer.byteLength(payload)},
                      "host": 'us14.api.mailchimp.com',
                      "path": path,
                      "method": 'POST'
                }, (res) => {
                    console.log('statusCode:', res.statusCode);
                    console.log('headers:', res.headers);
                    res.setEncoding('utf8');
                    res.on('data', (chunk) => {
                        if (typeof callback != 'function') {
                            return;
                        }
                        callback(chunk.toString());
                    });
                });
    req.write(payload);
    req.end();
}

function newContactAPI (subscribed, email, name, clientIP, country) {

    path = '/3.0/lists/' + mailList + '/members';
    var payload = JSON.stringify({
                    "email_type" : "html",
                    "status" : subscribed ? "pending" : "unsubscribed",
                    "email_address" : email,
                    "merge_fields" : {
                         "FNAME" : name,
                         "OPTIN_IP" : clientIP,
                         "COUNTRY" : country
                        }
                });
    mailAPI (path, payload, (response) => {console.log(response)});

}

// Landing Route
// app.get('/', function(req, res){
//     res.render()
// });

// Post Template
app.post('/post', function(req, res){
    var timestamp = Date.now();
    var name = req.body.name;
    var email = req.body.mail;
    var postal_code = req.body.postal.toLowerCase();
    var subscribed = req.body.subscribe;
    var clientIP = req.headers['CF-Connecting-IP'] || req.headers['X-Forwarded-For'] || req.connection.remoteAddress || '';
    var country = req.headers['CF-IPCountry'] || '';

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
        newContactAPI (subscribed, email, name, clientIP, country);
    };
});
// Does the table exist?
db.get("SELECT count(*) AS found FROM sqlite_master WHERE type='table' AND name='first_form'",function(err,row){
    if (row.found == 0) { // not found, create the first instance
        execute("create table first_form(timestamp, name, email, postal_code, subscribed)",{})
    }
});

// App Start
app.listen(process.env.PORT || 8003);
