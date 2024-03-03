require("dotenv").config();
const mysql = require('mysql2');

// Common setup MySQL database connection
const dbConnection = (isAllowDBName=true) => {
    
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        ...(isAllowDBName && { database: process.env.DB_DATABASE })
    });

    // Connect to the database
    db.connect(err => {
        if (err) {
            console.error('Error connecting to the database:', err);
            throw err;
        }
        console.log('Connected to the database');
    });

    return db;
};

module.exports = dbConnection;
