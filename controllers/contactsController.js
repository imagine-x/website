var ContactsService = require('../services/contactsService');
var SlackService = require('../services/slackService');
var MailService = require('../services/mailService');


function contactsController (database) {
  this.slack = new SlackService(database);
  this.contacts = new ContactsService(database);
  this.mail = MailService;
}


function validate (contact){
    var error = [];
    if (contact.name.match(/[/\\()~!@#$%^&*+-;|<>"'_]/)){
        error.push('name');
    }
    if (!contact.email.match(/^\w+\.?\w+?\@\w+\.(\w+\.)?\w+$/)){
        error.push('email');
    }
    if (contact.postal_code && !contact.postal_code.match(/^[a-z]\d[a-z]\s[\s]+\d[a-z]\d$/)){
        error.push('postal_code');
    }
    return error;
}

contactsController.prototype.submit = function(req, res){

    var contact = {
        'name' : req.body.name.trim(),
        'email' : req.body.mail.trim().toLowerCase(),
        'postal_code' : req.body.postal.trim().toUpperCase(),
        'subscribed' : req.body.subscribe,
        'clientIP' : req.headers['CF-Connecting-IP'] || req.ip || '',
        'country' : req.headers['CF-IPCountry'] || '',
        'timestamp' : Date.now()
    };

    var error = validate(contact);

    if (error.length > 0){
        return res.send({ok: false, data:error});
    }

    this.contacts.save(contact, res);
    this.contacts.add(contact);
    this.mail.sendWelcome(contact);
    this.slack.notify(contact);
};

module.exports = contactsController;
