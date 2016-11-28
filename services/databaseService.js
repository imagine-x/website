var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();


function DatabaseService(filename) {
    var exists = fs.existsSync(filename);
    if (!exists) {
      console.log("Creating DB file.");
      fs.openSync(filename, "w");
    }
    this.db = new sqlite3.Database(filename);
}

function sql_error (command, params, content) {
    console.error("SQL Error");
    console.error(command);
    console.error(params);
    console.error(content);
}

DatabaseService.prototype.select = function (query, params) {
    var self = this;
    return new Promise(function (resolve,reject) {
        return self.db.all(query, params, (err, result) => {
            if(err) {
                sql_error(query, params, err);
                return (reject) ? reject(err) : '';
            } else if (resolve) {
                return resolve(result);
            } else {
                console.log("No callback", query);
            }
        });
    });
};

DatabaseService.prototype.execute = function (query, params) {
    var self = this;
    return new Promise(function (resolve,reject) {
        return self.db.run(query, params, function(err, result) {
            if (err) {
                sql_error(query, params, err);
                return (reject) ? reject(err) : '';
            }
            if (resolve) {
                return resolve(result);
            }
            console.log("No callback", query);
        });
    });
};

DatabaseService.prototype.setupTable = function () {
    var self = this;
    return self.select("SELECT * FROM sqlite_master WHERE type='table' AND name='first_form'")
        .then(function (results) {
                if (results.count == 0) {
                    console.log('Table not found, creating first_form...');
                    self.execute("create table first_form (timestamp, name, email, postal_code, subscribed)");
                }
                console.log('Table first form already exists');
            });
};

module.exports = DatabaseService;
