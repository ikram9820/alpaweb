import * as React from "react";
import StatusesGrid from "./StatusesGrid";
import UserProfile from "./UserProfile";

const MyProfile = (props) => {
  return (
    <div>
      <UserProfile className="" {...props.userProfile} />
      <hr className="line" src={props.line} />
      <StatusesGrid />
    </div>
  );
};
export default MyProfile;
