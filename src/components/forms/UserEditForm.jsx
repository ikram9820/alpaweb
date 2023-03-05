import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/auth";
import { useNavigate } from "react-router-dom";

export default function UserEditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initUser = {
    name: "",
    about: "",
    profile: "",
  };
  const [userForm, setUserForm] = useState(initUser);
  const user = useSelector((state) => state.entities.auth.user);
  const isLoading = useSelector((state) => state.entities.auth.isLoading);

  useEffect(() => {
    // if (!isLoading ) navigate("/profile");
    if (user)
      setUserForm({ name: user.name, about: user.about, profile: user.dp_url });
  }, [user, isLoading, navigate, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser(userForm));
  };

  const handleInputChange = (event) => {
    setUserForm({
      ...userForm,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="row text-white">
      <div className="col-md-6 offset-md-3  mt-5">
        <form onSubmit={handleSubmit}>
          <p className="text-center">Update Your Details</p>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userForm.name}
              onChange={handleInputChange}
              id="name"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="about">
              About
            </label>
            <input
              type="text"
              name="about"
              value={userForm.about}
              onChange={handleInputChange}
              id="about"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
