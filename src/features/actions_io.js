import { createAction } from "@reduxjs/toolkit";

export const ioCallBegan = createAction("io/callBegan");
export const ioCallSuccess = createAction("io/callSuccess");
export const ioCallFailed = createAction("io/callFailed");
