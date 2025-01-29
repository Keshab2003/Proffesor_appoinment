// import { express } from 'express';
const express = require('express');
// import colors from 'colors';
const colors = require('colors');
// import dotenv from 'dotenv';
const dotenv = require('dotenv');
// import morgan from 'morgan';
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });


const app = express();
//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: "Server is running",
    });
});

//port
const PORT = process.env.PORT || 8080;

//listen port 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
});