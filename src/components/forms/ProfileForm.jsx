import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, createProfile } from "../../features/profile";
import Input from "./Input";

export default function ProfileForm({ isEditForm }) {
  const dispatch = useDispatch();
  const initProfile = {
    profession: "",
    gender: "",
    country: "",
    language: "",
    birth_date: "",
  };
  const [profileForm, setProfileForm] = useState(initProfile);
  const profile = useSelector((state) => state.entities.profile.profile);
  const isLoading = useSelector((state) => state.entities.profile.isLoading);

  useEffect(() => {
    if (profile) setProfileForm(profile);
  }, [profile, isLoading, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditForm) {
      dispatch(updateProfile(profileForm));
    } else dispatch(createProfile(profileForm));
  };

  const handleInputChange = (event) => {
    setProfileForm({
      ...profileForm,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="row text-white">
      <div className="col-md-6 offset-md-3  mt-5">
        <form onSubmit={handleSubmit}>
          <p className="text-center">
            {isEditForm ? "Edit" : "Create"} Your Profile
          </p>
          <Input
            name={"profession"}
            type={"text"}
            value={profileForm.profession}
            handleInputChange={handleInputChange}
          />
          <Input
            name={"gender"}
            type={"text"}
            value={profileForm.gender}
            handleInputChange={handleInputChange}
          />
          <Input
            name={"country"}
            type={"text"}
            value={profileForm.country}
            handleInputChange={handleInputChange}
          />
          <Input
            name={"language"}
            type={"text"}
            value={profileForm.language}
            handleInputChange={handleInputChange}
          />
          <Input
            name={"birth_date"}
            type={"date"}
            value={profileForm.birth_date}
            handleInputChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary btn-block mb-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
