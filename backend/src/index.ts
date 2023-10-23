import Express from "express";
const express = require('express');
const app = express();
const sql = require("mssql");

const port = 8000

app.get('/', (req: Express.Request, res: Express.Response) => {


    // config for your database
    const config = {
        user: 'sa',
        password: 'mypassword',
        server: 'localhost',
        database: 'SchoolDB'
    };

    // connect to your database
    sql.connect(config, function (err: Error) {

        if (err) console.log(err);

        // create Request object
        let request = new sql.Request();

        // query to the database and get the records
        request.query('select * from Student', function (err: Error, recordset: any) {

            if (err) console.log(err)

            // send records as a response
            res.send(recordset);

        });
    });
    res.send('Hello World!!!');

});

app.listen(port, () => {
    console.log('Server is running..');
});