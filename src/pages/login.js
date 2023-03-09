import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth";
import Input from "../components/forms/Input";
export default function Login() {
  const dispatch = useDispatch();
  const initUser = {
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(initUser);
  const navigate = useNavigate();
  const error = useSelector((state) => state.entities.auth.isError);
  const success = useSelector((state) => state.entities.auth.isSuccess);
  const message = useSelector((state) => state.entities.auth.message);
  const user = useSelector((state) => state.entities.auth.user);

  useEffect(() => {
    // if (error) toast.error(message);
    if (success || user) navigate("/");
    dispatch(reset());
  }, [user, error, success, message, navigate, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(credentials));
    setCredentials(initUser);
  };

  const handleInputChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="row bg-dark text-white vh-100">
      <div className="col-md-6 offset-md-3 mt-5">
        <form onSubmit={handleSubmit}>
          <p className="text-center">Login</p>

          <Input
            name={"email"}
            type={"email"}
            value={credentials.email}
            handleInputChange={handleInputChange}
          />
          <Input
            name={"password"}
            type={"password"}
            value={credentials.password}
            handleInputChange={handleInputChange}
          />

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>
        </form>
        <p>
          Not a member? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
