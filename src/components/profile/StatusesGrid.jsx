import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStatuses, addStatus } from "../../features/status";
import ProfileStats from "./ProfileStats";

function StatusesGrid() {
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.entities.status.list);
  useEffect(() => {
    dispatch(loadStatuses());
  }, [dispatch]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    dispatch(addStatus(file));
  };

  return (
    <div className="text-center">
      <ProfileStats />

      <div className="mb-5 btn btn-secondary btn-sm fw-bold">
        <label className="file-upload-label" htmlFor="file-input">
          Add New File
        </label>
        <input
          type="file" 
          id="file-input"
          name="file-input"
          onChange={handleFileChange}
        />
      </div>

      <div className="row row-cols-3">
        {statuses &&
          statuses.map((status) => {
            return (
              <div key={status._id} className="col">
                <img
                  className="pb-4 object-fit-cover img-fluid d-block"
                  src={status.file}
                  height={350}
                  width={380}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default StatusesGrid;
