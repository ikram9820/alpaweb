import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStatuses } from "../../features/status";
import ProfileStats from "./ProfileStats";

function StatusesGrid() {
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.entities.status.list);
  useEffect(() => {
    dispatch(loadStatuses());
  }, []);
  return (
    <div className="text-center">
      <ProfileStats />
      <button className="mb-5 btn btn-secondary btn-sm fw-bold">
        Add New Status
      </button>

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
