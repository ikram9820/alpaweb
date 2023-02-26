import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "statuses",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    statusesRequested: (statuses, action) => {
      statuses.loading = true;
    },

    statusesReceived: (statuses, action) => {
      statuses.list = action.payload;
      statuses.loading = false;
      statuses.lastFetch = Date.now();
    },

    statusesRequestFailed: (statuses, action) => {
      statuses.loading = false;
    },

    statusAssignedToUser: (statuses, action) => {
      const { id: statusId, userId } = action.payload;
      const index = statuses.list.findIndex(status => status.id === statusId);
      statuses.list[index].userId = userId;
    },

    // command - event
    // addStatus - statusAdded
    statusAdded: (statuses, action) => {
      statuses.list.push(action.payload);
    },

    // resolveStatus (command) - statusResolved (event)
    statusResolved: (statuses, action) => {
      const index = statuses.list.findIndex(status => status.id === action.payload.id);
      statuses.list[index].resolved = true;
    }
  }
});

export const {
  statusAdded,
  statusResolved,
  statusAssignedToUser,
  statusesReceived,
  statusesRequested,
  statusesRequestFailed
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
      onStart: statusesRequested.type,
      onSuccess: statusesReceived.type,
      onError: statusesRequestFailed.type
    })
  );
};

export const addStatus = status =>
  apiCallBegan({
    url,
    method: "post",
    data: status,
    onSuccess: statusAdded.type
  });

export const resolveStatus = id =>
  apiCallBegan({
    // /statuses
    // PATCH /statuses/1
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: statusResolved.type
  });

export const assignStatusToUser = (statusId, userId) =>
  apiCallBegan({
    url: url + "/" + statusId,
    method: "patch",
    data: { userId },
    onSuccess: statusAssignedToUser.type
  });

// Selector

// Memoization
// statuses => get unresolved statuses from the cache

export const getStatusesByUser = userId =>
  createSelector(
    state => state.entities.statuses,
    statuses => statuses.filter(status => status.userId === userId)
  );

export const getUnresolvedStatuses = createSelector(
  state => state.entities.statuses,
  state => state.entities.projects,
  (statuses, projects) => statuses.list.filter(status => !status.resolved)
);
