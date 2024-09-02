const mysql = require('mysql2');

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '99v@R*k77',
    database: 'claims'
});

pool.connect((err) => {
    if (err) {
        console.error('Could not connect to database', err.message);
    } else console.log('Connected to the database sucessfully');
});

module.exports = pool.promise();