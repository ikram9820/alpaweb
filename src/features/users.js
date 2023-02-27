import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    apiRequested: (users, action) => {
      users.loading = true;
    },

    usersReceived: (users, action) => {
      users.list = action.payload;
      users.loading = false;
      users.lastFetch = Date.now();
    },

    apiRequestFailed: (users, action) => {
      users.loading = false;
    },

    // userAssignedToUser: (users, action) => {
    //   const { id: userId, userId } = action.payload;
    //   const index = users.list.findIndex(user => user.id === userId);
    //   users.list[index].userId = userId;
    // },

    // command - event
    // adduser - userAdded

    me: (users, action) => {
        users.me = action.payload
        users.loading = false;
    },
    userAdded: (users, action) => {
      users.list.push(action.payload);
    },
    userUpdated: (users, action) => {
      users.list.push(action.payload);
    },
    userDeleted: (users, action) => {
      users.list.push(action.payload);
    },

    // resolveuser (command) - userResolved (event)
    userResolved: (users, action) => {
      const index = users.list.findIndex(
        (user) => user.id === action.payload.id
      );
      users.list[index].resolved = true;
    },
  },
});

export const {
  userAdded,
  userResolved,
  //   userAssignedToUser,
  usersReceived,
  usersRequested,
  usersRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/users";

//only those users with whome chat is done
export const loadUsers = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.users;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url,
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};

export const adduser = (user) =>
  apiCallBegan({
    url,
    method: "post",
    data: user,
    onSuccess: userAdded.type,
  });

export const resolveUser = (id) =>
  apiCallBegan({
    // /users
    // PATCH /users/1
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: userResolved.type,
  });

// export const assignuserToUser = (userId, userId) =>
//   apiCallBegan({
//     url: url + "/" + userId,
//     method: "patch",
//     data: { userId },
//     onSuccess: userAssignedToUser.type
//   });

// Selector

// Memoization
// users => get unresolved users from the cache

// export const getusersByUser = userId =>
//   createSelector(
//     state => state.entities.users,
//     users => users.filter(user => user.userId === userId)
//   );

export const getUnresolvedUsers = createSelector(
  (state) => state.entities.users,
  (state) => state.entities.projects,
  (users, projects) => users.list.filter((user) => !user.resolved)
);
