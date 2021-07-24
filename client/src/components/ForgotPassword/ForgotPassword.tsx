import { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { RouteComponentProps } from "react-router-dom";

import MetaData from "../MetaData/MetaData";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const ForgotPassword: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");

  const { forgotPassword, clearUserErrors } = useActions();
  const { errors, message, loading } = useTypedSelector(state => state.user);
  const alert = useAlert();

  useEffect(() => {
    if (errors) {
      alert.error(errors);
      clearUserErrors();
    }

    if (message) {
      alert.success(message);
    }
  }, [alert, errors, message]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword(email);
  };
  return (
    <Fragment>
      <MetaData title="Forgot Password" />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
