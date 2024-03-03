
const dbConnection = require('@utils/dbConnection.js');
const connection = dbConnection(false);

// Here we connect to the database and create the table in database

    console.log('Connected to the MySQL server.');

    // Create the database if not created in mysql server
    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`, (err) => {
        if (err) throw err;

        console.log(`Database ${process.env.DB_DATABASE}  created successfully.`);

        // Switch to  database
        connection.changeUser({ database: process.env.DB_DATABASE }, (err) => {
            if (err) throw err;

            // Create the users table
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    full_name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    phone VARCHAR(10) NOT NULL
                )
            `;

            connection.query(createTableQuery, (err) => {
                console.log(`Database`, err);
                if (err) throw err;

                console.log('Table "users" created successfully.');

                        // After creating the 'users' table, seed dummy data for 3 users
                        const seedDummyUsersQuery = `
                        INSERT INTO users (full_name, email, phone) VALUES
                        ('John Doe', 'john.doe@example.com', '1234567890'),
                        ('Jane Smith', 'jane.smith@example.com', '9876543210'),
                        ('Michael Johnson', 'michael.johnson@example.com', '5551234567')
                        `;

                        connection.query(seedDummyUsersQuery, (err) => {
                        if (err) {
                            console.error('Error seeding dummy users:', err);
                        } else {
                            console.log('Dummy users seeded successfully.');
                        }
                        });
               
                // Close the connection
                connection.end((err) => {
                    if (err) throw err;
                    console.log('Database connection closed.');
                });
            });
        });
    });

