import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
      type: Number,
      required: [true, "Please enter the product price"],
      maxLength: [10, "Product price cannot exceed 10 characters"],
      default: 0.0
    },
    description: {
      type: String,
      required: [true, "Please enter the product description"],
      maxLength: [2000, "Product description cannot exceed 2000 characters"]
    },
    rating: {
      type: Number,
      default: 0
    },
    images: [
      {
        publicId: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }
    ],
    category: {
      type: String,
      required: [true, "Please select category for this product"],
      enum: {
        values: [
          "Electronics",
          "Cameras",
          "Laptops",
          "Accessories",
          "Headphones",
          "Food",
          "Books",
          "Clothes/Shoes",
          "Beauty/Health",
          "Sports",
          "Outdoor",
          "Home"
        ],
        message: "Please select correct category for this product"
      }
    },
    seller: {
      type: String,
      required: [true, "Please enter product seller"]
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      maxLength: [5, "Product stock cannot exceed 5 characters"],
      default: 0
    },
    numberOfReviews: {
      type: Number,
      default: 0
    },
    reviews: [
      {
        name: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          required: true
        },
        comment: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
