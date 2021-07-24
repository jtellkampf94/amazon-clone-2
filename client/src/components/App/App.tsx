import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useActions } from "../../hooks/useActions";

import "./App.css";

const App: React.FC = () => {
  const { loadUser } = useActions();

  useEffect(() => {
    loadUser();
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
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
