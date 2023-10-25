"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 8000;
app.get('/', (req, res) => {
    // config for your database
    const connection = mysql.createConnection({
        host: 'backend',
        user: 'root',
        password: 'arezoo1234',
        database: 'mydb',
    });
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL database');
    });
    connection.end();
    res.send('Hello World!!!');
});
app.listen(port, () => {
    console.log('Server is running..');
});
