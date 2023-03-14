import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../features/chats";

function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    setShowInput(!showInput);
    if (showInput && groupName && groupName.trim() !== "")
      dispatch(createGroup({ name: groupName }));
  }
  return (
    <>
      <div
        onClick={handleSubmit}
        className="sidemenubutton text-center fw-bold "
      >
        {showInput && "Create"} New Group
      </div>
      {showInput && (
        <input
          className="search-input"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          type="text"
          placeholder="Group Name"
        />
      )}
    </>
  );
}

export default CreateGroup;
