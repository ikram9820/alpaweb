import * as React from "react";
import "./EditBtn.css";
const EditBtn = (props) => {
  return (
    <div className={`edit-btn ${props.className || ""}`}>
      <div className="rectangle-2">{props.editProfile || "Edit profile"}</div>
    </div>
  );
};
export default EditBtn;
