// import { express } from 'express';
const express = require('express');
// import colors from 'colors';
const colors = require('colors');
// import dotenv from 'dotenv';
const dotenv = require('dotenv');
// import morgan from 'morgan';
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');

// dotenv.config({ path: './config/config.env' });
dotenv.config();

//mongoDB connection
connectDB();




const app = express();
//middleware
app.use(cors());

app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));



// Manually set CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});


//routes
app.use("/api/v1/user", require("./routes/userRoutes"));

// app.get('/', (req, res) => {
//     res.status(200).send({
//         success: true,
//         message: "Server is running",
//     });
// });

//test purpose


//port
const PORT = process.env.PORT || 8080;

//listen port 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
});




