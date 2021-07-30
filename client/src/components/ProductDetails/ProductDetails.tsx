import { useEffect, Fragment, useState } from "react";
import { useAlert } from "react-alert";
import { RouteComponentProps } from "react-router-dom";
import { Carousel } from "react-bootstrap";

import Loader from "../Loader/Loader";
import MetaData from "../MetaData/MetaData";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface Params {
  id: string;
}

const ProductDetails: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const {
    product: { product, loading, errors, success },
    auth: { user }
  } = useTypedSelector(state => state);
  const {
    getProduct,
    reviewReset,
    clearProductErrors,
    addToCart,
    createReview
  } = useActions();
  const alert = useAlert();

  useEffect(() => {
    getProduct(match.params.id);

    if (errors) {
      alert.error(errors);
      clearProductErrors();
    }

    if (success) {
      alert.success("Review successfully submitted");
      reviewReset();
    }
  }, [alert, errors, match.params.id, success]);

  const increaseQty = () => {
    const count: HTMLInputElement | null = document.querySelector(".count");

    if (count && product) {
      if (count.valueAsNumber >= product.stock) return;

      const qty = count.valueAsNumber + 1;
      setQuantity(qty);
    }
  };

  const decreaseQty = () => {
    const count: HTMLInputElement | null = document.querySelector(".count");

    if (count) {
      if (count.valueAsNumber <= 1) return;

      const qty = count.valueAsNumber - 1;
      setQuantity(qty);
    }
  };

  const addItemTocart = () => {
    addToCart(match.params.id, quantity);
    alert.success("Item added to cart");
  };

  function setUserRating() {
    const stars: NodeListOf<HTMLLIElement> | null = document.querySelectorAll(
      ".star"
    );

    if (stars) {
      stars.forEach(function(star, index: number) {
        //@ts-ignore
        star.starValue = index + 1;

        const eventTypes: Array<"click" | "mouseover" | "mouseout"> = [
          "click",
          "mouseover",
          "mouseout"
        ];

        eventTypes.forEach(function(e) {
          star.addEventListener(e, function(e: MouseEvent) {
            stars.forEach((star, index: number) => {
              if (e.type === "click") {
                //@ts-ignore
                if (index < this.starValue) {
                  star.classList.add("orange");
                  //@ts-ignore
                  setRating(this.starValue);
                } else {
                  star.classList.remove("orange");
                }
              }

              if (e.type === "mouseover") {
                //@ts-ignore
                if (index < this.starValue) {
                  star.classList.add("yellow");
                } else {
                  star.classList.remove("yellow");
                }
              }

              if (e.type === "mouseout") {
                star.classList.remove("yellow");
              }
            });
          });
        });
      });
    }
  }

  const reviewHandler = () => {
    createReview({ rating, comment, productId: match.params.id });
    setComment("");
    setRating(0);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product?.name || "Amazon Clone 2 - Product"} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product?.images.map(image => (
                  <Carousel.Item key={image.publicId}>
                    <img
                      className="d-block w-100"
                      src={image.url}
                      alt={product.name}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product?.name}</h3>
              <p id="product_id">Product # {product?._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product?.rating || 0 / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">
                ({product?.numberOfReviews} Reviews)
              </span>

              <hr />

              <p id="product_price">${product?.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                onClick={addItemTocart}
                disabled={product?.stock === 0}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={
                    product?.stock || 0 > 0 ? "greenColor" : "redColor"
                  }
                >
                  {product?.stock || 0 > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product?.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product?.seller}</strong>
              </p>

              {user ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRating}
                >
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-5">
                  Login to post your review.
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={reviewHandler}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
