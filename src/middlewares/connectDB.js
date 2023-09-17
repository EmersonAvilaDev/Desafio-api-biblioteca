const mongoose = require("mongoose");
const handleExpectedError = require("../functions/handleExpectedErrors");

const connectDB = async (req = null, res = null, next = null) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    try {
      next();
    } catch {}
    return mongoose;
  } catch (error) {
    console.log(error);
    handleExpectedError(res, "Error: Erro ao conectar no banco de dados")
    return error;
  }
};

module.exports = connectDB;
