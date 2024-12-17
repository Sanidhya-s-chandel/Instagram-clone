const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(process.env.dbUrl);
    console.log("Connected to MongoDB...");
};

connectDB();

module.exports = mongoose.connection;