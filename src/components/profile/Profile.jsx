import * as React from "react";
import "./Profile.css";
// import statuses from "../assets/statuses.svg";
import UserProfile from "./UserProfile";
const MyProfile = (props) => {
  return (
    <div className={`profile ${props.className || ""}`}>
      <UserProfile className="user-instance-1" {...props.userProfile} />
      <hr className="line" src={props.line } />
      <img className="statuses-1" src={props.statuses} />
    </div>
  );
};
export default MyProfile;
