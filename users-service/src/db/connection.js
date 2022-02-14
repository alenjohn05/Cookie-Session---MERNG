const mongoose = require("mongoose");
const uri = require("./dbUrl");

const connection = async () => {
  try {
    const conn = await mongoose.connect(uri.dbURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connection();
