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
var listApiKey = process.env.LISTAPIKEY || '';
var mailApiKey = process.env.MAILAPIKEY || '';

var crypto = require('crypto');
var md5 = function (str) {
    var hash = crypto.createHash('md5');
    hash.update(str.toLowerCase().trim());
    return hash.digest('hex');
};
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


function slackAPI (name, email) {

    var firstName = name.split(" ")[0] || '';
    var gravitarURL = "https://www.gravatar.com/avatar/" + md5(email) + "&s=40";
    var post_data = JSON.stringify({  "text": "New signup: " + firstName,
                                        "username" : isProduction ? "ProdBot" : "DevBot",
                                        "icon_url" : gravitarURL
                                    });
    var req = https.request({
                    "headers": { 'Content-type': 'application/json',
                                'Content-Length': Buffer.byteLength(post_data)},
                    "host": 'hooks.slack.com',
                    "path": '/services/T2CT8GAHK/B2WNNK39B/wqUtlyfYzA0bzKx7FJXmwkCd',
                    "method": 'POST'
              },(res) => {
                  console.log('statusCode:', res.statusCode, 'headers:', res.headers);
                  res.on('data', (chunk) => {
                      console.log(chunk.toString());
                  });
          });
    req.write(post_data);
    req.end();
}


function mailAPI (path, payload, callback) {
    if (listApiKey == '') {
        return;
    }
    var req = https.request({
                      "headers": {  "Authorization" : 'Basic ' + listApiKey,
                                    'Content-Length': Buffer.byteLength(payload)},
                      "host": 'us14.api.mailchimp.com',
                      "path": path,
                      "method": 'POST'
                }, (res) => {
                    if (res.statusCode != '200') {
                        console.log('statusCode:', res.statusCode);
                        console.log('headers:', res.headers);
                        return;
                    }

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
                    "status" : subscribed ? "subscribed" : "pending",
                    "email_address" : email,
                    "merge_fields" : {
                         "FNAME" : name,
                         "OPTIN_IP" : clientIP,
                         "COUNTRY" : country
                        }
                });
    mailAPI (path, payload, (response) => {});

}

function sendWelcome(email, name) {
    if (mailApiKey == '') {
        return;
    }
    var post_data = JSON.stringify({
                        "key": mailApiKey,
                        "template_name": "imagine-x",
                    	"template_content": [],
                        "global_merge_vars": [
                            {
                                "name": "FNAME",
                                "content": name
                            }
                        ],
                        "message": {
                            "to": [
                                {
                                    "email": email,
                                    "name": name,
                                    "type": "to"
                                }
                            ]
                        }
                    });
    var req = https.request({
                    "headers": { 'Content-type': 'application/json',
                                'Content-Length': Buffer.byteLength(post_data)},
                    "host": 'mandrillapp.com',
                    "path": '/api/1.0/messages/send-template.json',
                    "method": 'POST'
              },(res) => {
                  console.log('statusCode:', res.statusCode, 'headers:', res.headers);
                  res.on('data', (chunk) => {
                      console.log(chunk.toString());
                  });
          });
    req.write(post_data);
    req.end();

}


// Landing Route
// app.get('/', function(req, res){
//     res.render()
// });
app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})

// Post Template
app.post('/post', function(req, res){
    var timestamp = Date.now();
    var name = req.body.name;
    var email = req.body.mail;
    var postal_code = req.body.postal.toLowerCase();
    var subscribed = req.body.subscribe;
    var clientIP = req.headers['CF-Connecting-IP'] || req.ip || '';
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
        sendWelcome(email,name);
        slackAPI(name, email);
    };
});

app.post('/slackCommand', function(req, res){

    console.log (req.headers['CF-Connecting-IP'],req.ip,req.headers['CF-IPCountry']);
    var token_hash = md5(req.body.token || '');
    var user_name = req.body.user_name || '';
    var user_name_hash = md5(user_name);
    var user_id = req.body.user_id || '';
    var user_id_hash = md5(user_id);
    var command = req.body.command || '';

    var authorizedUsers = ['65fbef05e01fac390cb3fa073fb3e8cf',
                            '9818e2287e76d37753313e255e2428a2',
                            'a185111d5e99bd8ff410dc463f9ec4f8'];

    if (!(
        command == '/dumplist' &&
        token_hash == 'fcf3d60b50ad7904e73739e80c373fa8' &&
        (authorizedUsers.indexOf(user_name_hash) >= 0)
    )) {
        return res.status(404).send('Not found');
    }
    db.serialize(() => {
        db.all("SELECT * FROM first_form", (err, results) => {
            output = results.map((row) => [row.email, row.name, row.postal, row.subscribed].join())
                            .join('\n');
            res.json({
                "response_type": "ephemeral",
                "text": "Email database",
                "attachments": [
                    {
                        "text": output
                    }
                ]
            });
        })
    })

});

// Does the table exist?
db.get("SELECT count(*) AS found FROM sqlite_master WHERE type='table' AND name='first_form'",function(err,row){
    if (row.found == 0) { // not found, create the first instance
        execute("create table first_form(timestamp, name, email, postal_code, subscribed)",{})
    }
});

// App Start
app.listen(process.env.PORT || 8003);
