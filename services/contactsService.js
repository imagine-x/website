var https = require('https');
var isProduction = (process.env.PRODUCTION == 'true');
function contactsService (database) {
  this.database = database;
  this.listApiKey = process.env.LISTAPIKEY || '';
  this.mailList = isProduction ? '7e7fb31eaa' : '1194bbe271';
}

function contactAPI (path, payload) {

    return new Promise(function (resolve,reject) {
        if (this.listApiKey == '') {
            return;
        }
        var req = https.request({
                          "headers": {  "Authorization" : 'Basic ' + listApiKey,
                                        'Content-Length': Buffer.byteLength(payload)},
                          "host": 'us14.api.mailchimp.com',
                          "path": '/3.0/lists/' + this.mailList + '/members',
                          "method": 'POST'
                    }, (res) => {
                        res.setEncoding('utf8');
                        var rawData = '';
                        res.on('data', (chunk) => rawData += chunk);
                        res.on('end', (chunk) => (res.statusCode > 299) ? reject(rawData) : resolve(rawData));
                    });
        req.write(payload);
        req.end();
    });
}

contactsService.prototype.add = function (contact) {

    var payload = JSON.stringify({
                    "email_type" : "html",
                    "status" : contact.subscribed ? "subscribed" : "pending",
                    "email_address" : contact.email,
                    "merge_fields" : {
                         "FNAME" : contact.name,
                         "OPTIN_IP" : contact.clientIP,
                         "COUNTRY" : contact.country
                        }
                });
    contactAPI(payload).then((resp) => console.log(resp));
}
contactsService.prototype.save = function (contact, res) {
    var self = this;
    var query = "INSERT INTO first_form(timestamp, name, email, postal_code, subscribed) " +
                "VALUES ($timestamp, $name, $email, $postal_code, $subscribed)";
    self.database.execute(query, {
        '$timestamp' : contact.timestamp,
        '$name' : contact.name,
        '$postal_code' : contact.postal_code,
        '$email' : contact.email,
        '$subscribed' : contact.subscribed,
    }).then(() => res.send({ok: true}));
}


module.exports = contactsService;
