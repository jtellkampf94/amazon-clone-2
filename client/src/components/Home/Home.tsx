import { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { RouteComponentProps } from "react-router-dom";
import Pagination from "react-js-pagination";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MetaData from "../MetaData/MetaData";
import Product from "../Product/Product";
import Loader from "../Loader/Loader";

interface Params {
  keyword: string;
}

const Home: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const alert = useAlert();
  const {
    loading,
    products,
    productsCount,
    errors,
    resultsPerPage
  } = useTypedSelector(state => state.products);
  const { getProducts } = useActions();

  const keyword = match.params.keyword || "";

  //@ts-ignore
  useEffect(() => {
    if (errors) {
      return alert.error(errors);
    }

    getProducts(keyword, currentPage);
  }, [errors, currentPage, keyword]);

  const handleChange = (page: number) => {
    setCurrentPage(page);
  };

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
              {products &&
                products.map(product => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
          {resultsPerPage <= productsCount && (
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
