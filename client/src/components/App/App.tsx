import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";
import ProductDetails from "../ProductDetails/ProductDetails";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import NewPassword from "../NewPassword/NewPassword";
import Cart from "../Cart/Cart";
import Shipping from "../Shipping/Shipping";
import ConfirmOrder from "../ConfirmOrder/ConfirmOrder";
import Payment from "../Payment/Payment";
import OrderSuccess from "../OrderSuccess/OrderSuccess";
import ListOrders from "../ListOrders/ListOrders";
import OrderDetails from "../OrderDetails/OrderDetails";
import Dashboard from "../Dashboard/Dashboard";
import ProductsList from "../ProductsList/ProductsList";
import NewProduct from "../NewProduct/NewProduct";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import "./App.css";

const App: React.FC = () => {
  const { loadUser } = useActions();
  const { loading, user } = useTypedSelector(state => state.auth);
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    loadUser();

    const getStripeApiKey = async () => {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    };

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route exact path="/" component={Home} />
          <Route exact path="/search/:keyword" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/password/forgot" component={ForgotPassword} />
          <Route exact path="/password/reset/:token" component={NewPassword} />
          <Route exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute
            exact
            path="/profile/update"
            component={UpdateProfile}
          />
          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute
            exact
            path="/order/confirm"
            component={ConfirmOrder}
          />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute exact path="/payment" component={Payment} />
            </Elements>
          )}
          <ProtectedRoute exact path="/success" component={OrderSuccess} />
          <ProtectedRoute exact path="/orders" component={ListOrders} />
          <ProtectedRoute
            exact
            path="/order/:id"
            //@ts-ignore
            component={OrderDetails}
          />
        </div>
        <ProtectedRoute
          exact
          path="/dashboard"
          isAdmin={true}
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductsList}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        {!loading && user && user.role !== "admin" && <Footer />}
      </div>
    </Router>
  );
};

export default App;
