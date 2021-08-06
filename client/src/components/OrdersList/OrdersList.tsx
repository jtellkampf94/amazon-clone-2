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
  numberOfItems: number;
  amount: string;
  status: JSX.Element;
  actions: JSX.Element;
}

const OrdersList: React.FC<RouteComponentProps> = ({ history }) => {
  const { getAllOrders, clearOrderErrors } = useActions();
  const { errors, allOrders, loading } = useTypedSelector(state => state.order);

  const alert = useAlert();

  useEffect(() => {
    getAllOrders();

    if (errors) {
      alert.error(errors);
      clearOrderErrors();
    }
  }, [errors]);

  const setOrders = () => {
    const data: { columns: Columns[]; rows: Rows[] } = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc"
        },
        {
          label: "Number of Items",
          field: "numberOfItems",
          sort: "asc"
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc"
        },
        {
          label: "Status",
          field: "status",
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

    allOrders?.forEach(order => {
      data.rows.push({
        id: order._id,
        numberOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Fragment>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2">
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
      <MetaData title="All Orders" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-5">All Orders</h1>

          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setOrders()}
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

export default OrdersList;
