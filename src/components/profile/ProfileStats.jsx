import * as React from "react";
const ProfileStats = (props) => {
  return (
    <div className="py-5 fw-semibold fs-4 my-3">
      <span>{props.num || "10"}</span>
      <span className="px-3">Statuses</span>
      <span >
        <button className="mx-5 btn btn-secondary btn-sm fw-bold">
          Add New Status
        </button>
      </span>
      <span >{props.num1 || "500"}</span>
      <span className="px-3">Views</span>
    </div>
  );
};
export default ProfileStats;
