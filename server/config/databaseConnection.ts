import mongoose from "mongoose";

const databaseConnection = async () => {
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
};

export default databaseConnection;
