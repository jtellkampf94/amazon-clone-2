import { Fragment, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useAlert } from "react-alert";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MetaData from "../MetaData/MetaData";
import Loader from "../Loader/Loader";

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

const ListOrders: React.FC = () => {
  const { loading, errors, orders } = useTypedSelector(state => state.order);
  const { getOrders, clearOrderErrors } = useActions();

  const alert = useAlert();

  useEffect(() => {
    getOrders();

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

    orders?.forEach(order => {
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
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        )
      });
    });
    return data;
  };
  return (
    <Fragment>
      <MetaData title="My Orders" />
      <h1 className="mt-5">My Orders</h1>

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
    </Fragment>
  );
};

export default ListOrders;
