const mongoose = require('mongoose')
require("dotenv").config();

async function mongoConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/');
        console.log('MongoDB Conected!')
    } catch (error) {
        console.error(error);
    }
}

module.exports = mongoConnection;