import { useSelector, useDispatch } from "react-redux";
import { isEditProfileToggled } from "../../features/ui";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.entities.auth.user);
  const profile = useSelector((state) => state.entities.profile.profile);

  return (
    <div className="d-flex m-5">
      <img
        className="rounded-circle object-fit-cover"
        src="/images/img2.jpg"
        height={200}
        width={200}
      />
      <div className="fw-semibold fs-4  ms-5 mt-3">
        <div className="d-flex mb-2">
          <span>{user.name}</span>
          <button
            onClick={() => dispatch(isEditProfileToggled())}
            className="ms-5 btn btn-secondary btn-sm fw-bold"
          >
            Edit Profile
          </button>
        </div>
        <div className="pb-2">country: {profile.country}</div>
        <div className="pb-2">language: {profile.language}</div>
        <div className="pb-2">gender: {profile.gender}</div>
        <div className="pb-2">profession: {profile.profession}</div>
      </div>
    </div>
  );
};
export default UserProfile;
