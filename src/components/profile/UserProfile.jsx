import * as React from "react";
const UserProfile = (props) => {
  return (
    <div className="d-flex m-5">
      <img className="rounded-circle" src={props.profilePhoto} />
      <div className="fw-semibold fs-4  ms-5 mt-3">
        <div className="d-flex">
          <span>{props.username || "Ikram98"}</span>
          <button className="ms-5 btn btn-secondary btn-sm fw-bold">
            Edit Profile
          </button>
        </div>
        <div className="pb-2">{props.bio || "Bio"}</div>
      </div>
    </div>
  );
};
export default UserProfile;
