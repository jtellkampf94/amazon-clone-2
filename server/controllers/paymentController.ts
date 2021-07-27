import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";

import catchAsyncErrorsMiddleware from "../middlewares/catchAsyncErrorsMiddleware";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2020-08-27"
});

// Process stripe payments => /api/v1/payment/process
export const processPayment = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" }
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });
  }
);

// Send stripe publishable / api key payments => /api/v1/stripeapi
export const getStripeAPI = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
  }
);
