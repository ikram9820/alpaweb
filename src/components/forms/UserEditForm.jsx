import { useState, useEffect } from "react";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/auth";

export default function UserEditForm() {
  const dispatch = useDispatch();
  const initUser = {
    name: "",
    about: "",
    profile: "",
  };
  const [userForm, setUserForm] = useState(initUser);
  const user = useSelector((state) => state.entities.auth.user);
  const isLoading = useSelector((state) => state.entities.auth.isLoading);

  useEffect(() => {
    if (user)
      setUserForm({ name: user.name, about: user.about, profile: user.dp_url });
  }, [user, isLoading, dispatch]);

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

          <Input
            name={"name"}
            type={"text"}
            value={userForm.name}
            handleInputChange={handleInputChange}
          />

          <Input
            name={"about"}
            type={"text"}
            value={userForm.about}
            handleInputChange={handleInputChange}
          />

          <button type="submit" className="btn btn-primary btn-block mb-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
