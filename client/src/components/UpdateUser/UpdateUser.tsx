import { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { RouteComponentProps } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import MetaData from "../MetaData/MetaData";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface Params {
  id: string;
}

const UpdateUser: React.FC<RouteComponentProps<Params>> = ({
  match,
  history
}) => {
  const { updateUser, userReset, clearUserErrors, getUser } = useActions();
  const { errors, isUpdated, loading, users, user } = useTypedSelector(
    state => state.user
  );
  const alert = useAlert();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = match.params.id;

  useEffect(() => {
    if (user) {
      if (user._id !== userId) {
        getUser(userId);
      } else {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    } else {
      getUser(userId);
    }

    if (errors) {
      alert.error(errors);
      clearUserErrors();
    }

    if (isUpdated) {
      alert.success("User successfully updated");
      history.push("/admin/users");
      userReset();
    }
  }, [errors, isUpdated, userId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateUser(userId, { name, email, role });
  };

  return (
    <Fragment>
      <MetaData title={`Update User`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={handleSubmit}>
                <h1 className="mt-2 mb-5">Update User</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role_field">Role</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn update-btn btn-block mt-4 mb-3"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
