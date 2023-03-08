import axios from "axios";
import * as actions from "../actions_api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);

    const user = JSON.parse(localStorage.getItem("user"));
    let token = null;
    const config = {
      
    };
    if (user) token = user.token;
    try {
      const response = await axios.request({
        baseURL: "http://localhost:3900/api/v1",
        url,
        method,
        data,
        headers: {
          "x-auth-token":  token,
        },
      });
      // General
      dispatch(actions.apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
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
