import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector((state) => state.entities.auth.user);
  const navigate = useNavigate();

  return (
    <div className="d-flex m-5">
      <img
        className="rounded-circle object-fit-cover"
        src="/images/profile.jpg"
        height={100}
        width={100}
      />
      <div className="fw-semibold fs-5  ms-5 mt-3">
        <div className="d-flex mb-2">
          <span>{user && user.name}</span>
          <button
            onClick={() => navigate("/edit-profile")}
            className="ms-5 btn btn-secondary btn-sm fw-bold"
          >
            Edit Profile
          </button>
        </div>
        <div className="pb-2"> {user && user.about}</div>
      </div>
    </div>
  );
};
export default UserProfile;
