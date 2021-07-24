import { Route, Link } from "react-router-dom";
import { useAlert } from "react-alert";

import Search from "../Search/Search";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

import "./Header.css";

const Header: React.FC = () => {
  const alert = useAlert();
  const { logout } = useActions();
  const {
    auth: { user, loading },
    cart: { cartItems }
  } = useTypedSelector(state => state);

  const handleClick = () => {
    logout();
    alert.success("Logged out successfully");
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
              className="header__logo"
            />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Route component={Search} />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            {cartItems.length}
          </span>
        </Link>
        {user ? (
          <div className="ml-4 dropdown d-inline">
            <Link
              to="#!"
              className="btn dropdown-toggle text-white mr-4"
              type="button"
              id="dropDownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  className="rounded-circle"
                  src={user.avatar && user.avatar.url}
                  alt={user && user.name}
                />
              </figure>
              <span>{user && user.name}</span>
            </Link>

            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
              {user && user.role !== "admin" ? (
                <Link className="dropdown-item" to="/orders">
                  Orders
                </Link>
              ) : (
                <Link className="dropdown-item" to="/dashboard">
                  Dashboard
                </Link>
              )}
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
              <Link
                className="dropdown-item text-danger"
                to="/"
                onClick={handleClick}
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          !loading && (
            <Link to="/login" className="btn ml-4" id="login_btn">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;
