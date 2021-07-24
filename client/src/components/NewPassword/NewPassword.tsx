import { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { RouteComponentProps } from "react-router-dom";

import MetaData from "../MetaData/MetaData";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface Params {
  token: string;
}

const NewPassword: React.FC<RouteComponentProps<Params>> = ({
  history,
  match
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPassword, clearUserErrors } = useActions();
  const { errors, success, loading } = useTypedSelector(state => state.user);
  const alert = useAlert();

  useEffect(() => {
    if (errors) {
      alert.error(errors);
      clearUserErrors();
    }

    if (success) {
      alert.success("Password updated successfully");
      history.push("/login");
    }
  }, [alert, errors, success, history]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword(match.params.token, { password, confirmPassword });
  };

  return (
    <Fragment>
      <MetaData title="Reset Password" />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">New Password</h1>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;
