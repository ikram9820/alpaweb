import * as React from "react";
import line from "./assets/line.svg";
import profilePhoto from "./assets/profilePhoto.svg";
import MyProfile from "../components/profile/Profile";
import Navbar from "../components/Navbar";
const Profile = () => {
  const propsData = {
    profile: {
      line: line,
      userProfile: {
        username: "Ikram98",
        profilePhoto: profilePhoto,
        profileStats: {
          views: "Views",
          num1: "500",
          num: "10",
          statuses: "Statuses",
        },
        bio: "Bio",
        editBtn: {
          editProfile: "Edit profile",
        },
        name: "Name",
      },
      statuses: "statuses",
    },
  };
  return (
    <div >
      <Navbar />
      <MyProfile className="profile" {...propsData.profile} />
    </div>
  );
};
export default Profile;
