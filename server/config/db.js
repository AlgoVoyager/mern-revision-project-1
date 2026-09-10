const mongoose = require('mongoose')

async function mongoConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI );
        console.log('MongoDB Conected!')
    } catch (error) {
        console.error(error);
    }
}

module.exports = mongoConnection;