import { Request } from "express";
import { Model, Query } from "mongoose";

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

  filter() {
    const queryCopy = { ...this.queryString };

    //Removing fileds from query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach(el => delete queryCopy[el]);

    // Advance filter for price, ratings ect.
    let queryString = JSON.stringify(queryCopy);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      match => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  pagination(resultsPerPage: number) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);
    // @ts-ignore
    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

export default APIFeatures;
