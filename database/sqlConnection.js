const mysql = require('mysql');

    const conn = mysql.createConnection({
        host: 'localhost',
        user : 'saif',
        password : 'Skills@123',
        database : 'company',
        dialect: 'mysql'
    });

module.exports = conn; 