const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'eventosMorelos',
    multipleStatements: true
});

connection.connect(error => {

    if (!error) {
        console.log("DB CONNECTED");
    } else {
        console.log("***ERROR***");
    }

});

module.exports = connection;