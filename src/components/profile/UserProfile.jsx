import * as React from "react";
import "./UserProfile.css";
// import profilePhoto from "../assets/profilePhoto.svg";
import EditBtn from "./EditBtn";
import ProfileStats from "./ProfileStats";
const UserProfile = (props) => {
  return (
    <div className={`user-profile ${props.className || ""}`}>
      <img className="profile-photo" src={props.profilePhoto} />
      <div className="flex-container">
        <div className="flex-container-1">
          <span>{props.username || "Ikram98"}</span>
          <EditBtn className="edit-btn-instance-1" {...props.editBtn} />
        </div>
        <ProfileStats
          className="profile-stats-instance-1"
          {...props.profileStats}
        />
        <span className="name">{props.name || "Name"}</span>
        <span className="bio">{props.bio || "Bio"}</span>
      </div>
    </div>
  );
};
export default UserProfile;
