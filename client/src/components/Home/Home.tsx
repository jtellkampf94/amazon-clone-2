import { Fragment, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import MetaData from "../MetaData/MetaData";
import Product from "../Product/Product";

const Home: React.FC = () => {
  const { loading, products, productsCount, errors } = useTypedSelector(
    state => state.products
  );
  const { getProducts } = useActions();

  useEffect(() => {
    getProducts();
  }, []);

  return (
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
  );
};

export default Home;
