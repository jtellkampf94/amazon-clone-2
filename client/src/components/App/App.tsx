import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";
import ProductDetails from "../ProductDetails/ProductDetails";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
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
          <ProtectedRoute exact path="/profile" component={Profile} />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
