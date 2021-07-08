import express from "express";
import dotenv from "dotenv";

import databaseConnection from "./config/databaseConnection";
import errorMiddleware from "./middlewares/errorMiddleware";
import productRoutes from "./routes/productRoutes";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/v1", productRoutes);
app.use(errorMiddleware);

databaseConnection();

app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
