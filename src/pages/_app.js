import "@/styles/globals.css";
import "@/styles/normal.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from "react-redux";
import store from "../store/configureStore";


export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store()}>
        <Component {...pageProps} />;
      </Provider>
      <ToastContainer />
    </>
  );
}
