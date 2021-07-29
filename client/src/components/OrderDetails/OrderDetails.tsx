import { Fragment, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAlert } from "react-alert";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MetaData from "../MetaData/MetaData";
import Loader from "../Loader/Loader";

export interface Params {
  id: string;
}

const OrderDetails: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const { getOrder, clearOrderErrors } = useActions();
  const { order, loading, errors } = useTypedSelector(state => state.order);

  const alert = useAlert();

  useEffect(() => {
    getOrder(match.params.id);

    if (errors) {
      alert.error(errors);
      clearOrderErrors();
    }
  }, [errors, match.params.id]);

  return (
    <Fragment>
      <MetaData title="Order Details" />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {order?._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {order?.user?.name}
              </p>
              <p>
                <b>Phone:</b> {order?.shippingInfo.phoneNumber}
              </p>
              <p className="mb-4">
                <b>Address:</b>
                {`${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.postalCode}, ${order?.shippingInfo.country}`}
              </p>
              <p>
                <b>Amount:</b> ${order?.totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p
                className={
                  order?.paymentInfo && order.paymentInfo.status === "succeeded"
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>
                  {order?.paymentInfo &&
                  order.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  order?.orderStatus &&
                  String(order.orderStatus).includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{order?.orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {order?.orderItems.map(item => (
                  <div key={item.product} className="row my-5">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-5">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>${item.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>{item.quantity} Piece(s)</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
