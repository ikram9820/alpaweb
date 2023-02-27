import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "../features/reducer";
// import logger from "./middleware/logger";
import toast from "../features/middleware/toast";
import api from "../features/middleware/api";

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      // logger({ destination: "console" }),
      toast,
      api
    ]
  });
}
