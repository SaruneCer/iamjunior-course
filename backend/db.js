const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT ?? 3001;

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {dbName: "iamjunior"});
    console.log("Connected to MongoDB with Mongoose");
  } catch (err) {
    console.error("Could not connect to the database", err);
    process.exit(1);
  }
};

module.exports = { connectToDb, PORT };