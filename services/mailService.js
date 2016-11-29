var https = require('https');
var mailApiKey = process.env.MAILAPIKEY || '';

function mailAPI (post_data) {
    return new Promise(function (resolve,reject) {
        if (mailApiKey == '') {
            console.log('mailAPIKey not defined');
            return;
        }
        var req = https.request({
                        "headers": {'Content-type': 'application/json',
                                    'Content-Length': Buffer.byteLength(post_data)},
                        "host": 'mandrillapp.com',
                        "path": '/api/1.0/messages/send-template.json',
                        "method": 'POST'
                  },(res) => {
                      res.setEncoding('utf8');
                      var rawData = '';
                      res.on('data', (chunk) => rawData += chunk);
                      res.on('end', (chunk) => (res.statusCode > 299) ? reject(rawData) : resolve(rawData));
                  });
        req.write(post_data);
        req.end();
    });
}

function mailService() {
}

// sends an email out via the templating service
mailService.prototype.sendWelcome = function(contact) {

    var post_data = JSON.stringify({
                        "key": mailApiKey,
                        "template_name": "imagine-x",
                    	"template_content": [],
                        "global_merge_vars": [
                            {
                                "name": "FNAME",
                                "content": contact.name
                            }
                        ],
                        "message": {
                            "to": [
                                {
                                    "email": contact.email,
                                    "name": contact.name,
                                    "type": "to"
                                }
                            ]
                        }
                    });
    return mailAPI(post_data);
}

module.exports = mailService;
