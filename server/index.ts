import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";

import databaseConnection from "./config/databaseConnection";
import errorMiddleware from "./middlewares/errorMiddleware";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";
import ErrorHandler from "./utils/errorHandler";

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Routes
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
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
