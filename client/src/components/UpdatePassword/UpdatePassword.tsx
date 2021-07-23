import { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { RouteComponentProps } from "react-router-dom";

import MetaData from "../MetaData/MetaData";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const UpdatePassword: React.FC<RouteComponentProps> = ({ history }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { updatePassword, clearUserErrors, updatePasswordReset } = useActions();
  const { errors, isUpdated, loading } = useTypedSelector(state => state.user);
  const alert = useAlert();

  useEffect(() => {
    if (errors) {
      alert.error(errors);
      clearUserErrors();
    }

    if (isUpdated) {
      alert.success("Password updated successfully");

      history.push("/profile");

      updatePasswordReset();
    }
  }, [alert, errors, history, isUpdated]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePassword({ oldPassword, newPassword });
  };

  return (
    <Fragment>
      <MetaData title="Change Password" />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
