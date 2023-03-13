import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../features/chats";

function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    if (groupName && groupName.trim() !== "")
      dispatch(createGroup({ name: groupName }));
  }
  return (
    <>
      <div onClick={(e) => setShowInput(!showInput)} className="sidemenubutton">
        <span className="fw-bolder fs-5">+</span>
        Create New Group
      </div>
      {showInput && (
        <form onSubmit={handleSubmit}>
          <input
            className="search-input"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            type="text"
            placeholder="Search chats"
          />
        </form>
      )}
    </>
  );
}

export default CreateGroup;
