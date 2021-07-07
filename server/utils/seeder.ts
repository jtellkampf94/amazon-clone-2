import dotenv from "dotenv";

import databaseConnection from "../config/databaseConnection";
import Product from "../models/Product";
import products from "../data/products.json";

dotenv.config();
databaseConnection();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("All Products are added");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedProducts();
