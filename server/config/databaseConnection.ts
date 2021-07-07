import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_DB_URI || "mongodb://localhost:27017/amazon-clone",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );

    if (connection) {
      console.log(
        `MongoDD database connected at host ${connection.connection.host}`
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export default databaseConnection;
