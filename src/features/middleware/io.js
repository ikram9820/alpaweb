import { io } from "socket.io-client";
import * as actions from "../actions_io";

const socket = io("http://localhost:3900");
const ioMiddelware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.ioCallBegan.type) return next(action);

    const { func, event, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);

    const callback = (response) => {
      if (response && response.data){
        // General
        dispatch(actions.ioCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
      }
      else if (response && response.error) {
        const error = response.error;
        // General
        dispatch(actions.ioCallFailed(error));
        // Specific
        if (onError) dispatch({ type: onError, payload: error });
      }
    };
    if (func === "on") {
      socket.on(event, callback);
    } else {
      socket.emit(event, data, callback);
    }
  };

export default ioMiddelware;
