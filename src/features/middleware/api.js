import axios from "axios";
import { sendMessage } from "../../socket/io";
import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, event, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.request({
        baseURL: "http://localhost:3900/api/v1",
        url,
        method,
        data,
        headers: {
          "x-auth-token": user ? user.token : null,
          "content-type": "application/json",
        },
      });
      // General
      dispatch(actions.apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
      if (event === "sendMessage") sendMessage(response.data);
    } catch (ex) {
      let error;
      if (ex.response) error = ex.response.data;
      else error = ex.message;
      // General
      dispatch(actions.apiCallFailed(error));
      // Specific
      if (onError) dispatch({ type: onError, payload: error });
    }
  };

export default api;
