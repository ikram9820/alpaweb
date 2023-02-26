import classes from "./navbar.module.css";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.entities.auth.user);
  const navigate = useNavigate();
  function userLogout() {
    dispatch(logout());
    dispatch(reset());
    navigate("login");
  }

  return (
    <div className={classes.nav}>
      <Search />
      <div className="d-flex">
        {user && <h6 className="p-2">map</h6>}
        {user && <h6 className="p-2">setting</h6>}
        {user && (
          <h6 onClick={userLogout} className="p-2">
            Logout
          </h6>
        )}
        {user && (
          <Link to="/profile" className="p-2">
            profile
          </Link>
        )}

        {!user && (
          <Link to="/login" className="p-2">
            Login
          </Link>
        )}
        {!user && (
          <Link to="/register" className="p-2">
            Register
          </Link>
        )}
      </div>
    </div>
  );
}
