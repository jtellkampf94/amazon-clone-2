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
  price: string;
  stock: number;
  actions: JSX.Element;
}

const ProductsList: React.FC<RouteComponentProps> = ({ history }) => {
  const { loading, errors, products } = useTypedSelector(
    state => state.products
  );
  const { getAdminProducts, clearErrors } = useActions();

  const alert = useAlert();

  useEffect(() => {
    getAdminProducts();

    if (errors) {
      alert.error(errors);
      clearErrors();
    }
  }, [errors]);

  const setProducts = () => {
    const data: { columns: Columns[]; rows: Rows[] } = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc"
        },
        {
          label: "Name",
          field: "name",
          sort: "asc"
        },
        {
          label: "Price",
          field: "price",
          sort: "asc"
        },
        {
          label: "Stock",
          field: "stock",
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

    products?.forEach(product => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
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
      <MetaData title="All Products" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-5">All Products</h1>

          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setProducts()}
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

export default ProductsList;
