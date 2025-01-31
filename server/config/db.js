const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB server connected on ${mongoose.connection.host}`.cyan.underline);
    }
    catch(error){
        console.log(`MongoDB server error ${error}`.bgRed.white);
    }
}

module.exports = connectDB;