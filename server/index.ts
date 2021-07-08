import express from "express";
import dotenv from "dotenv";

import databaseConnection from "./config/databaseConnection";
import errorMiddleware from "./middlewares/errorMiddleware";
import productRoutes from "./routes/productRoutes";
import ErrorHandler from "./utils/errorHandler";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/v1", productRoutes);
app.use(errorMiddleware);

// Handle uncaught exceptions
process.on("uncaughtException", (error: ErrorHandler) => {
  console.log(`ERROR: ${error.stack}`);
  console.log("Shutting down server due to uncaught exception");
  server.close(() => {
    process.exit(1);
  });
});

databaseConnection();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (error: ErrorHandler) => {
  console.log(`ERROR: ${error.message}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
