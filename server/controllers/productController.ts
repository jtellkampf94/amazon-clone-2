import { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";

import Product from "../models/Product";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrorsMiddleware from "../middlewares/catchAsyncErrorsMiddleware";
import APIFeatures from "../utils/apiFeatures";

// Create new product => /api/v1/admin/product/new
export const createProduct = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    let images: string[] = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    let imagesLinks: { publicId: string; url: string }[] = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products"
      });

      imagesLinks.push({
        publicId: result.public_id,
        url: result.secure_url
      });
    }

    req.body.images = imagesLinks;
    //@ts-ignore
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product
    });
  }
);

// Get all products => /api/v1/products?keyword=apple
export const getProducts = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const resultsPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter();

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resultsPerPage);
    products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      resultsPerPage,
      productsCount,
      filteredProductsCount,
      products
    });
  }
);

// Get all products (Admin) => /api/v1/admin/products
export const getAdminProducts = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products
    });
  }
);

// Get single product => /api/v1/product/:id
export const getSingleProduct = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product
    });
  }
);

// Update Product => /api/v1/admin/product/:id
export const updateProduct = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    let images: string[] = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].publicId);
      }

      let imagesLinks: { publicId: string; url: string }[] = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products"
        });

        imagesLinks.push({
          publicId: result.public_id,
          url: result.secure_url
        });
      }

      req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(200).json({
      success: true,
      product
    });
  }
);

// Delete product => /api/v1/admin/product/:id
export const deleteProduct = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Delete images associated with product
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].publicId);
    }

    await product.remove();

    res.status(200).json({
      success: true,
      message: "Product is deleted"
    });
  }
);

interface Review {
  _id: string;
  comment: string;
  rating: number;
  name: string;
  user: string;
}

// Create review => /api/v1/review
export const createProductReview = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rating, comment, productId } = req.body;

    const review = {
      //@ts-ignore
      user: req.user._id,
      //@ts-ignore
      name: req.user.name,
      rating: Number(rating),
      comment
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      //@ts-ignore
      (r: Review) => r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((review: Review) => {
        //@ts-ignore
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = Number(rating);
        }
      });
    } else {
      product.reviews.push(review);
      product.numberOfReviews = product.reviews.length;
    }

    product.rating =
      product.reviews.reduce(
        (acc: number, review: Review) => review.rating + acc,
        0
      ) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true
    });
  }
);

// Get Product Reviews => /api/v1/reviews
export const getProductReviews = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
      success: true,
      reviews: product.reviews
    });
  }
);

// Delete Product Review => /api/v1/review
export const deleteReview = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(
      //@ts-ignore
      (review: Review) => review._id.toString() !== req.query.id.toString()
    );

    const numberOfReviews = reviews.length;

    const rating =
      product.reviews.reduce(
        (acc: number, review: Review) => review.rating + acc,
        0
      ) / reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      { reviews, rating, numberOfReviews },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(200).json({
      success: true
    });
  }
);
