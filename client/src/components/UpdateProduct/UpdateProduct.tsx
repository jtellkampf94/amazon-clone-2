import { Fragment, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAlert } from "react-alert";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ProductData } from "../../redux/actionCreators";
import MetaData from "../MetaData/MetaData";
import Sidebar from "../Sidebar/Sidebar";

interface Params {
  id: string;
}

const UpdateProduct: React.FC<RouteComponentProps<Params>> = ({
  match,
  history
}) => {
  const {
    updateProduct,
    getProduct,
    clearProductErrors,
    productReset
  } = useActions();
  const { errors, isUpdated, loading, product } = useTypedSelector(
    state => state.product
  );

  const alert = useAlert();
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<Array<string | ArrayBuffer | null>>([]);
  const [oldImages, setOldImages] = useState<
    Array<{ publicId: string; url: string }>
  >([]);
  const [imagesPreview, setImagesPreview] = useState<
    Array<string | ArrayBuffer | null>
  >([]);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home"
  ];

  useEffect(() => {
    if (product) {
      if (product._id !== productId) {
        getProduct(productId);
      } else {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setStock(product.stock);
        setSeller(product.seller);
        setCategory(product.categories);
        setOldImages(product.images);
      }
    } else {
      getProduct(productId);
    }

    if (errors) {
      alert.error(errors);
      clearProductErrors();
    }

    if (isUpdated) {
      history.push("/admin/products");
      alert.success("Product created successfully");
      productReset();
    }
  }, [errors, isUpdated, product, productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      setImagesPreview([]);
      setImages([]);
      setOldImages([]);

      files.forEach(file => {
        if (file) {
          const reader = new FileReader();

          reader.onload = () => {
            if (reader.readyState === 2 && typeof reader.result === "string") {
              setImagesPreview(oldArray => [...oldArray, reader.result]);
              setImages(oldArray => [...oldArray, reader.result]);
            }
          };

          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: ProductData = {
      name,
      price,
      description,
      category,
      stock,
      seller,
      images: []
    };

    images.forEach(image => {
      formData.images.push(image);
    });

    updateProduct(productId, formData);
  };

  return (
    <Fragment>
      <MetaData title="Update Product" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form className="shadow-lg" onSubmit={handleSubmit}>
              <h1 className="mb-4">Update Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows={8}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  className="form-control"
                  id="category_field"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={e => setStock(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller}
                  onChange={e => setSeller(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    onChange={handleChange}
                    multiple
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>

                {oldImages &&
                  oldImages.map(image => (
                    <img
                      key={image.publicId}
                      src={image.url}
                      alt="Product Image"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}

                {imagesPreview.map(
                  image =>
                    image &&
                    typeof image === "string" && (
                      <img
                        key={image}
                        src={image}
                        alt="Image Preview"
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    )
                )}
              </div>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading}
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
