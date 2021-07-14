import { Model } from "mongoose";
import { Response } from "express";

// create and send token and save in cookie
export const sendToken = (
  user: Model<any, any, any>,
  statusCode: number,
  res: Response
) => {
  // create jwt token
  //@ts-ignore
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() +
        (Number(process.env.COOKIE_EXPIRES_TIME) || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user
    });
};
