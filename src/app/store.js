import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
// import logger from "./middleware/logger";
import toast from "../features/middleware/toast";
import api from "../features/middleware/api";

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      toast,
      api,
      
    ]
  });
}
