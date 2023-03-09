import MyProfile from "../components/profile/Profile";
import ProfileForm from "../components/forms/ProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadProfile } from "../features/profile";
const Profile = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.entities.profile.profile);
  const isLoading = useSelector((state) => state.entities.profile.isLoading);
  const isEditProfile = useSelector((state) => state.ui.isEditProfile);
  useEffect(() => {
    dispatch(loadProfile());
  }, [dispatch]);
  return (
    <div>
      {isEditProfile ? (
        <ProfileForm isEditForm={true} />
      ) : (
        <>
          {!isLoading && !profile && <ProfileForm isEditForm={false} />}
          {profile && <MyProfile className="profile" />}
        </>
      )}
    </div>
  );
};
export default Profile;
