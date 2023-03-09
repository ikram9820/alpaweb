import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/forms/Input";
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initUser = {
    name: "",
    email: "",
    password: "",
    about: "",
  };
  const [userForm, setUserForm] = useState(initUser);
  const error = useSelector((state) => state.entities.auth.isError);
  const success = useSelector((state) => state.entities.auth.isSuccess);
  const message = useSelector((state) => state.entities.auth.message);
  const user = useSelector((state) => state.entities.auth.user);

  useEffect(() => {
    if (success || user) navigate("/");

    dispatch(reset());
  }, [user, error, success, message, navigate, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(userForm));
    setUserForm(initUser);
  };

  const handleInputChange = (event) => {
    setUserForm({
      ...userForm,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="row bg-dark text-white vh-100">
      <div className="col-md-6 offset-md-3  mt-5">
        <form onSubmit={handleSubmit}>
          <p className="text-center">Sign up</p>

          <Input
            name={"email"}
            type={"email"}
            value={userForm.email}
            handleInputChange={handleInputChange}
          />
          <Input
            name={"password"}
            type={"password"}
            value={userForm.password}
            handleInputChange={handleInputChange}
          />

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
            Sign Up
          </button>
        </form>
        <p>
          Have an Account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
