import classes from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, reset } from "../../features/auth";

function Navbar(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.entities.auth.user);
  function userLogout() {
    dispatch(logout());
    dispatch(reset());
  }

  return (
    <>
    <div className={classes.nav}>
        <Link className={classes.logo} to="/">
          ALPA
        </Link>
      <div className={classes.navItems}>
        {user && <Link to="/reels">Reels</Link>}
        {user && <Link to="/profile">Profile</Link>}
        {user && <Link onClick={userLogout}>Logout</Link>}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
      </div>
    </div>
    {props.children}
    </>
  );
}

export default Navbar;
