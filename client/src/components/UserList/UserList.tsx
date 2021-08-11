import { Fragment, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useAlert } from "react-alert";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MetaData from "../MetaData/MetaData";
import Loader from "../Loader/Loader";
import Sidebar from "../Sidebar/Sidebar";

interface Columns {
  label: string;
  field: string;
  sort: string;
}

interface Rows {
  id: string | undefined;
  name: string;
  email: string;
  role: string;
  actions: JSX.Element;
}

const UserList: React.FC<RouteComponentProps> = ({ history }) => {
  const { getAllUsers, clearUserErrors, userReset, deleteUser } = useActions();
  const { users, errors, loading, isDeleted } = useTypedSelector(
    state => state.user
  );

  const alert = useAlert();

  useEffect(() => {
    getAllUsers();

    if (errors) {
      alert.error(errors);
      clearUserErrors();
    }

    if (isDeleted) {
      alert.success("User successfully deleted");
      history.push("/admin/users");
      userReset();
    }
  }, [errors, isDeleted]);

  const deleteUserHandler = (id: string) => {
    deleteUser(id);
  };

  const setUsers = () => {
    const data: { columns: Columns[]; rows: Rows[] } = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc"
        },
        {
          label: "Name",
          field: "name",
          sort: "asc"
        },
        {
          label: "Email",
          field: "email",
          sort: "asc"
        },
        {
          label: "Role",
          field: "role",
          sort: "asc"
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc"
        }
      ],
      rows: []
    };

    users?.forEach(user => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <Fragment>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              onClick={() => deleteUserHandler(user._id)}
              className="btn btn-danger py-1 px-2 ml-2"
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        )
      });
    });
    return data;
  };
  return (
    <Fragment>
      <MetaData title="All Users" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-5">All Users</h1>

          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setUsers()}
              className="px-3"
              bordered
              striped
              hover
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UserList;
