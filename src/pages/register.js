import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register,reset} from "../features/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initUser = {
    name: "",
    email: "",
    password: "",
    birth_date: "",
  };
  const [userForm, setUserForm] = useState(initUser);
  const loading = useSelector((state) => state.entities.auth.isLoading);
  const error = useSelector((state) => state.entities.auth.isError);
  const success = useSelector((state) => state.entities.auth.isSuccess);
  const message = useSelector((state) => state.entities.auth.message);
  const user = useSelector((state) => state.entities.auth.user);

  useEffect(() => {
    if (error) toast.error(message);
    if (success || user)   navigate("/");

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

  if(loading) toast.info("please wait")

  return (
    <div className="row bg-dark text-white vh-100">
      
      <div className="col-md-6 offset-md-3  mt-5">
        <form onSubmit={handleSubmit}>
          <p className="text-center">Sign up</p>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="registerName">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userForm.name}
              onChange={handleInputChange}
              id="registerName"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="registerEmail">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userForm.email}
              onChange={handleInputChange}
              id="registerEmail"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="registerPassword">
              Password
            </label>
            <input
              name="password"
              value={userForm.password}
              onChange={handleInputChange}
              type="password"
              id="registerPassword"
              className="form-control"
            />
          </div>

          {/* <div className="form-outline mb-3">
                        <label className="form-label" for="registerRepeatPassword">Repeat password</label>
                        <input type="password" id="registerRepeatPassword" className="form-control" />
                    </div> */}

          <div className="form-group mb-3">
            <label className="form-label" htmlFor="birth_date">
              Birth Date:
            </label>
            <input
              type="date"
              className="form-control"
              name="birth_date"
              value={userForm.birth_date}
              onChange={handleInputChange}
              placeholder="YYYY-MM-DD"
              required
            />
          </div>
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
