const mongoose = require('mongoose');
const dns = require('dns');

// Use public DNS resolvers to prevent ECONNREFUSED on SRV record queries in Node.js
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function mongoConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected!');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
}

module.exports = mongoConnection;