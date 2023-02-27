import * as React from "react";
import "./ProfileStats.css";
const ProfileStats = (props) => {
  return (
    <div className={`profile-stats ${props.className || ""}`}>
      <span className="num-10">{props.num || "10"}</span>
      <span className="statuses">{props.statuses || "Statuses"}</span>
      <span className="num-500">{props.num1 || "500"}</span>
      <span className="views">{props.views || "Views"}</span>
    </div>
  );
};
export default ProfileStats;
