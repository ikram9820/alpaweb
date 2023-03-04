import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "statuses",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    apiRequested: (statuses, action) => {
      statuses.loading = true;
    },

    statusesReceived: (statuses, action) => {
      statuses.list = action.payload;
      statuses.loading = false;
      statuses.lastFetch = Date.now();
    },

    apiRequestFailed: (statuses, action) => {
      statuses.loading = false;
    },


    // command - event
    // addStatus - statusAdded
    statusAdded: (statuses, action) => {
      statuses.list.push(action.payload);
    },

    statusDeleted: (statuses, action) => {
      statuses.list = statuses.list.filter(
        (status) => status.id !== action.payload.id
      );
    },
  },
});

export const {
  statusAdded,
  statusDeleted,
  statusesReceived,
  apiRequested,
  apiRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/statuses";

export const loadStatuses = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.statuses;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url,
      onSuccess: statusesReceived.type,
      onStart: apiRequested.type,
      onError: apiRequestFailed.type,
    })
  );
};

export const addStatus = (status) =>
  apiCallBegan({
    url,
    method: "post",
    data: status,
    onSuccess: statusAdded.type,
    onStart: apiRequested.type,
    onError: apiRequestFailed.type,
  });

export const deleteStatus = (id) =>
  apiCallBegan({
    // /statuses
    // DELETE /statuses/1
    url: url + "/" + id,
    method: "delete",
    onSuccess: statusDeleted.type,
    onStart: apiRequested.type,
    onError: apiRequestFailed.type,
  });



export const getStatusesByUser = (userId) => (state) =>
  state.entities.statuses.filter((status) => status.userId === userId);
