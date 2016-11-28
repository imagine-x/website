function slackController (database) {
  this.database = database;
}

slackController.prototype.slackCommand = function (req, res) {

    var token_hash = md5(req.body.token || '');
    var user_name = req.body.user_name || '';
    var user_name_hash = md5(user_name);
    var user_id = req.body.user_id || '';
    var user_id_hash = md5(user_id);
    var command = req.body.command || '';
    var database = this.database;

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

    database.select("SELECT * FROM first_form")
            .then((results) => res.json({
                    "response_type": "ephemeral",
                    "text": "Email database",
                    "attachments": [
                        {
                            "text": results.map((row) => [row.email, row.name, row.postal, row.subscribed].join()).join('\n')
                        }
                    ]
                })
            );
}

module.exports = slackController;
