import { toast as toastify } from "react-toastify";
import * as actions from "../api";

const toast = store => next => action => {
  if (action.type === "error"|| action.type === actions.apiCallFailed.type) {
    toastify.error(action.payload);
  }
  if (action.type === actions.apiCallBegan.type) {
    toastify.info("Please wait...");
  }
  if (action.type === actions.apiCallSuccess.type) {
    toastify.success("Request complete successfully");
  }

  else return next(action);
};

export default toast;
