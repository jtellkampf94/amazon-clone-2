import { Fragment, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
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
  rating: number;
  comment: string;
  user: string;
  actions: JSX.Element;
}

const ProductReviews: React.FC = () => {
  const {
    getReviews,
    productReset,
    clearProductErrors,
    deleteReview
  } = useActions();
  const { loading, errors, reviews, isDeleted } = useTypedSelector(
    state => state.product
  );

  const alert = useAlert();

  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (errors) {
      alert.error(errors);
      clearProductErrors();
    }

    if (productId !== "") {
      getReviews(productId);
    }

    if (isDeleted) {
      alert.success("Review successfully deleted");
      productReset();
    }
  }, [errors, productId, isDeleted]);

  const deleteReviewHandler = (id: string) => {
    deleteReview(id, productId);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getReviews(productId);
  };

  const setReviews = () => {
    const data: { columns: Columns[]; rows: Rows[] } = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc"
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc"
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc"
        },
        {
          label: "User",
          field: "user",
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

    reviews?.forEach(review => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,
        actions: (
          <Fragment>
            <button
              onClick={() => deleteReviewHandler(review._id)}
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
      <MetaData title="Product Reviews" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="row justify-content-center mt-5">
            <div className="col-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="productId_field">Enter Product ID</label>
                  <input
                    type="text"
                    id="email_field"
                    className="form-control"
                    value={productId}
                    onChange={e => setProductId(e.target.value)}
                  />
                </div>

                <button
                  id="search_button"
                  type="submit"
                  className="btn btn-primary btn-block py-2"
                >
                  SEARCH
                </button>
              </form>
            </div>
          </div>
          {reviews && reviews.length > 0 ? (
            <MDBDataTable
              data={setReviews()}
              className="px-3"
              bordered
              striped
              hover
            />
          ) : (
            <p className="mt-5 text-center">No Reviews.</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
