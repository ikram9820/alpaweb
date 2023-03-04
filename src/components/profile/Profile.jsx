import * as React from "react";
import StatusesGrid from "./StatusesGrid";
import UserProfile from "./UserProfile";

const MyProfile = () => {
  return (
    <div>
      <UserProfile />
      <hr className="line" />
      <StatusesGrid />
    </div>
  );
};
export default MyProfile;
