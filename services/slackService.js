var https = require('https');
var crypto = require('crypto');

isProduction = (process.env.PRODUCTION == 'true');
var md5 = function (str) {
    var hash = crypto.createHash('md5');
    hash.update(str.toLowerCase().trim());
    return hash.digest('hex');
};

module.exports = slackService;

function slackService(database) {
  this.database = database;

}

function slackAPI(post_data) {
    return new Promise(function (resolve,reject) {
        var req = https.request({
                        "headers": { 'Content-type': 'application/json',
                                    'Content-Length': Buffer.byteLength(post_data)},
                        "host": 'hooks.slack.com',
                        "path": '/services/T2CT8GAHK/B2WNNK39B/wqUtlyfYzA0bzKx7FJXmwkCd',
                        "method": 'POST'
                  },(res) => {
                      var rawData = '';
                      res.on('data', (chunk) => rawData += chunk);
                      res.on('end', (chunk) => (res.statusCode > 299) ? reject(rawData) : resolve(rawData));
              });
        req.write(post_data);
        req.end();
    });
}

slackService.prototype.notify = (contact) => {
    var firstName = contact.name.split(" ")[0] || '';
    var gravitarURL = "https://www.gravatar.com/avatar/" + md5(contact.email) + "&s=40";
    var post_data = JSON.stringify({  "text": "New signup: " + firstName,
                                        "username" : isProduction ? "ProdBot" : "DevBot",
                                        "icon_url" : gravitarURL
                                    });
    return slackAPI(post_data);
};

slackService.prototype.nomineeNotify = (nomineeName) => {
    var post_data = JSON.stringify({
        "text": "New Nominee: " + nomineeName,
        "username" : isProduction ? "ProdBot" : "DevBot"
    });
    return slackAPI(post_data);
};
