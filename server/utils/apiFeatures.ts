import { Request } from "express";
import { Model } from "mongoose";

class APIFeatures {
  query: Model<any, any, any>;
  queryString: Request["query"];

  constructor(query: Model<any, any, any>, queryString: Request["query"]) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i"
          }
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
}

export default APIFeatures;
