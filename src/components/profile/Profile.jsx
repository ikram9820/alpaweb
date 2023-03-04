import * as React from "react";
import StatusesGrid from "./StatusesGrid";
import UserProfile from "./UserProfile";

const MyProfile = () => {
  return (
    <div className="container">
      <UserProfile />
      <hr  />
      <StatusesGrid />
    </div>
  );
};
export default MyProfile;
