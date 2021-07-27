import { Fragment, useEffect } from "react";
import axios from "axios";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import { RouteComponentProps } from "react-router-dom";
import { useAlert } from "react-alert";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MetaData from "../MetaData/MetaData";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";

const options = {
  style: {
    base: {
      fontSize: "16px"
    },
    invalid: {
      color: "#9e2146"
    }
  }
};

const Payment: React.FC<RouteComponentProps> = ({ history }) => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();

  const {
    auth: { user },
    cart: { cartItems, shippingInfo }
  } = useTypedSelector(state => state);

  useEffect(() => {}, []);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo") || "");

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const button: HTMLButtonElement | null = document.querySelector("#pay_btn");
    if (button) button.disabled = true;

    let res;

    try {
      res = await axios.post("/api/v1/payment/process", paymentData, {
        headers: { "Content-Type": "application/json" }
      });

      const clientSecret = res.data.clientSecret;

      if (!stripe || !elements) return;

      const card = elements.getElement(CardNumberElement);

      if (card) {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user?.name,
              email: user?.email
            }
          }
        });

        if (result.error) {
          alert.error(result.error.message);

          if (button) button.disabled = false;
        } else {
          // Payment processed or not
          if (result.paymentIntent.status === "succeeded") {
            // TODO: new order

            history.push("/success");
          } else {
            if (button) button.disabled = false;
            alert.error("A Error occured while payment was being processed");
          }
        }
      } else {
        // Can't get card details from stripe card number element
        if (button) button.disabled = false;
        alert.error("Something went wrong try again later");
      }
    } catch (error) {
      if (button) button.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {orderInfo.totalPrice && `- $${orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
