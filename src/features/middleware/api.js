import axios from "axios";
import * as actions from "../api";

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);
  try {
    const response = await axios.request({
      baseURL: "http://localhost:3900/api/v1",
      url,
      method,
      data
    });
    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (ex) {
    let error;
    if (ex.response)
    error = ex.response.data
    else error = ex.message
    // General
    dispatch(actions.apiCallFailed(error));
    // Specific
    if (onError) dispatch({ type: onError, payload: error });
  }

};

export default api;
