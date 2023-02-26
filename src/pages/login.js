import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { login, reset } from "../store/auth";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Login({ user }) {
  const dispatch = useDispatch();
  const initUser = {
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(initUser);
  const router = useRouter();
  const loading = useSelector((state) => state.entities.auth.isLoading);
  const error = useSelector((state) => state.entities.auth.isError);
  const success = useSelector((state) => state.entities.auth.isSuccess);
  const message = useSelector((state) => state.entities.auth.message);

  useEffect(() => {
    if (error) toast.error(message);
    if (success || user) router.push("/");
    dispatch(reset());
  }, [user, error, success, message, router, dispatch]);

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

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              id="email"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              id="password"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>
        </form>
        <p>
          Not a member? <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const user = useSelector((state) => state.entities.auth.user);
  return { props: { user } };
}

// export async function getStaticProps(context) {
//   const user = useSelector((state) => state.entities.auth.user);
//   return { props: { user } };
// }
