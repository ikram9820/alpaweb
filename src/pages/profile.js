import * as React from "react";
import MyProfile from "../components/profile/Profile";
import Navbar from "../components/Navbar";
import ProfileForm from "../components/forms/ProfileForm";
const Profile = () => {
  let profile = null;
  return (
    <div>
      <Navbar />
      {!profile && <ProfileForm isEditForm={false} />}
      {profile && <MyProfile className="profile"  />}
    </div>
  );
};
export default Profile;
