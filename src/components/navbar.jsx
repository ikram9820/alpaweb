import classes from "./navbar.module.css";
import Search from "./search";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { logout,reset } from "@/store/auth";
import { useEffect } from "react";

export default function Navbar({user}) {
  const dispatch = useDispatch()

  function userLogout(){
    dispatch(logout())
    dispatch(reset());
  }

  return (
    <div className={classes.nav}>
      <Search />
      <div className="d-flex">
        {user && <h6 className="p-2">map</h6>}
        {user && <h6 className="p-2">setting</h6>}
        {user && <h6 onClick={userLogout}  className="p-2">Logout</h6>}
        {user && (
          <Link href="/profile" className="p-2">
            profile
          </Link>
        )}

        {!user && (
          <Link href="/login" className="p-2">
            Login
          </Link>
        )}
        {!user && (
          <Link href="/register" className="p-2">
            Register
          </Link>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const user = useSelector((state) => state.entities.auth.user);
  return { props: { user } };
}

// export async function getServerSideProps(context) {
//   const user = useSelector((state) => state.entities.auth.user);
//   if (!user) {
//     return { notFound: true };
//   }

//   return {
//     props: { user  },
//   };
// }