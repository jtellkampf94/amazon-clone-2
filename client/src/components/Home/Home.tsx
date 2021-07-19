import { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import MetaData from "../MetaData/MetaData";
import Product from "../Product/Product";
import Loader from "../Loader/Loader";

const Home: React.FC = () => {
  const alert = useAlert();
  const { loading, products, productsCount, errors } = useTypedSelector(
    state => state.products
  );
  const { getProducts } = useActions();

  //@ts-ignore
  useEffect(() => {
    if (errors) {
      return alert.error(errors);
    }

    getProducts();
  }, [errors]);

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
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
