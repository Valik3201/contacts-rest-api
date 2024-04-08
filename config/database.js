require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection successful");

    console.log("Database Name:", mongoose.connection.db.databaseName);

    mongoose.connection.db.listCollections().toArray(function (err, names) {
      if (err) {
        console.log(err);
      } else {
        console.log("Collections:");
        names.forEach((name) => {
          console.log(name.name);
        });
      }
    });
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});

module.exports = connectDB;
