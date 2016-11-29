var https = require('https');
var isProduction = (process.env.PRODUCTION == 'true');
var mailList = isProduction ? '7e7fb31eaa' : '1194bbe271';
var listApiKey = process.env.LISTAPIKEY || '';

function contactsService (database) {
    this.database = database;
}

function contactAPI (payload) {

    return new Promise(function (resolve,reject) {
        if (listApiKey == '') {
            console.log('listAPIKey not found');
            return;
        }
        var req = https.request({
                          "headers": {
                                "Authorization" : 'Basic ' + listApiKey,
                                'Content-Length': Buffer.byteLength(payload)
                                    },
                          "host": 'us14.api.mailchimp.com',
                          "path": '/3.0/lists/' + mailList + '/members',
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

// add contact in the mailinglist provider, returns a promise
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
    return contactAPI(payload);
}

// saves contact in the databse, returns a promise
contactsService.prototype.save = function (contact) {
    var self = this;
    var query = "INSERT INTO first_form(timestamp, name, email, postal_code, subscribed) " +
                "VALUES ($timestamp, $name, $email, $postal_code, $subscribed)";
    return self.database.execute(query, {
        '$timestamp' : contact.timestamp,
        '$name' : contact.name,
        '$postal_code' : contact.postal_code,
        '$email' : contact.email,
        '$subscribed' : contact.subscribed,
    });
}

module.exports = contactsService;
