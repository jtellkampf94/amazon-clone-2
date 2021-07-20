import { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { RouteComponentProps } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MetaData from "../MetaData/MetaData";
import Product from "../Product/Product";
import Loader from "../Loader/Loader";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

interface Params {
  keyword: string;
}

const Home: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0)

  const categories = [
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
  ];

  const alert = useAlert();
  const {
    loading,
    products,
    productsCount,
    errors,
    resultsPerPage,
    filteredProductsCount
  } = useTypedSelector(state => state.products);
  const { getProducts } = useActions();

  const keyword = match.params.keyword || "";

  //@ts-ignore
  useEffect(() => {
    if (errors) {
      return alert.error(errors);
    }

    getProducts(keyword, currentPage, price, category, rating);
  }, [errors, currentPage, keyword, price, category, rating]);

  const handleChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategory = (category: string) => {
    setCategory(category);
  };

  const handleRating = (rating: number) => {
    setRating(rating);
  };

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Buy The Best Products Online" />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{ 1: `$1`, 1000: `$1000` }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={value => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true
                        }}
                        value={price}
                        onChange={price => setPrice(price)}
                      />

                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>

                        <ul className="pl-0">
                          {categories.map(category => (
                            <li
                              key={category}
                              onClick={() => handleCategory(category)}
                              style={{
                                cursor: "pointer",
                                listStyleType: "none"
                              }}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="my-3" />

                      <div className="mt-5">
                        <h4 className="mb-3">Rating</h4>

                        <ul className="pl-0">
                          {[5,4,3,2,1].map(star => (
                            <li
                              key={star}
                              onClick={() => handleRating(star)}
                              style={{
                                cursor: "pointer",
                                listStyleType: "none"
                              }}
                            >
                              <div className="rating-outer">
                                <div className="rating-inner" style={{width: `${star * 20}%`}}>

                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map(product => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products.map(product => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>
          {resultsPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={productsCount}
                onChange={handleChange}
                nextPageText="Next"
                prevPageText="Prev"
                lastPageText="Last"
                firstPageText="First"
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
