import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../features/chats";
import Input from "../forms/Input";

function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    setShowInput(!showInput);
    if (showInput && groupName && groupName.trim() !== "")
      dispatch(createGroup({ name: groupName, isPublic }));
  }
  return (
    <div className={showInput ? "border p-2" : ""}>
      <div
        onClick={handleSubmit}
        className="sidemenubutton text-center fw-bold "
      >
        {showInput && "Create"} New Group
      </div>
      {showInput && (
        <>
          <Input
            className="search-input"
            name={"group_name"}
            value={groupName}
            handleInputChange={(e) => setGroupName(e.target.value)}
            type="text"
          />
          <label>
            <input
              type="checkbox"
              className="form-check-input"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />{" "}
            Is Public
          </label>
        </>
      )}
    </div>
  );
}

export default CreateGroup;
