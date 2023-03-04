import classes from "./navbar.module.css";
import Search from "./chat/Search";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.entities.auth.user);
  const navigate = useNavigate();
  function userLogout() {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  }

  return (
    <div className={classes.nav}>
      <div className="d-flex">
        <Link className={classes.logo} to="/">
          ALPA
        </Link>
        <Search />
      </div>
      <div className={classes.navItems}>
        {user && <Link to="/setting">Setting</Link>}
        {user && <Link to="/profile">Profile</Link>}
        {user && <Link onClick={userLogout}>Logout</Link>}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
      </div>
    </div>
  );
}

export default Navbar;
