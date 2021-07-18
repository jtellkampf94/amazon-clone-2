import { Product as ProductInterface } from "../../redux/reducers/productReducer";

interface ProductProps {
  product: ProductInterface;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div key={product._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img className="card-img-top mx-auto" src={product.images[0].url} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <a href="">{product.name}</a>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.rating / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numberOfReviews} Reviews)</span>
          </div>
          <p className="card-text">${product.price}</p>
          <a href="#" id="view_btn" className="btn btn-block">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default Product;
