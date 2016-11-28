var https = require('https');
var mailApiKey = process.env.MAILAPIKEY || '';

function mailAPI (post_data) {
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
    mailAPI(post_data);
}

exports = {sendWelcome}
