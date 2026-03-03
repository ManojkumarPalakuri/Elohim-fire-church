const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://chevvaharish87_db_user:Elohim@cluster0.cpmlkqx.mongodb.net/?appName=Cluster0');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // Removed process.exit(1) so the API server stays alive even if DB fails
    }
};

module.exports = connectDB;
