import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
// import logger from "./middleware/logger";
import toast from "../features/middleware/toast";
import api from "../features/middleware/api";
import ioMiddelware from "../features/middleware/io";

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      // logger({ destination: "console" }),
      toast,
      api,
      ioMiddelware
    ]
  });
}
