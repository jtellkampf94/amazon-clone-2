import { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { RouteComponentProps } from "react-router-dom";

import MetaData from "../MetaData/MetaData";
import Loader from "../Loader/Loader";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const UpdateProfile: React.FC<RouteComponentProps> = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const {
    register,
    clearUserErrors,
    updateProfile,
    updateProfileReset,
    loadUser
  } = useActions();
  const {
    auth: { user },
    user: { errors, isUpdated, loading }
  } = useTypedSelector(state => state);
  const alert = useAlert();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (errors) {
      alert.error(errors);
      clearUserErrors();
    }

    if (isUpdated) {
      alert.success("Profile updated");
      loadUser();

      history.push("/profile");

      updateProfileReset;
    }
  }, [alert, errors, history, isUpdated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);

    updateProfile(formData);
  };
  return (
    <Fragment>
      <MetaData title="Update Profile" />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            onSubmit={handleSubmit}
            className="shadow-lg"
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
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
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={handleChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
