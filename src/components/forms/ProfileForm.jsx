import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, createProfile } from "../../features/profile";
import { useNavigate } from "react-router-dom";

export default function ProfileForm({ isEditForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    // if (!isLoading ) navigate("/profile");
    if (profile) setProfileForm(profile);
  }, [profile, isLoading, navigate, dispatch]);

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

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="profession">
              Profession
            </label>
            <input
              type="text"
              name="profession"
              value={profileForm.profession}
              onChange={handleInputChange}
              id="profession"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="gender">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              value={profileForm.gender}
              onChange={handleInputChange}
              id="gender"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={profileForm.country}
              onChange={handleInputChange}
              id="country"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="language">
              language
            </label>
            <input
              type="text"
              name="language"
              value={profileForm.language}
              onChange={handleInputChange}
              id="language"
              className="form-control"
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label" htmlFor="birth_date">
              Birth Date:
            </label>
            <input
              type="date"
              className="form-control"
              name="birth_date"
              value={profileForm.birth_date}
              onChange={handleInputChange}
              id="birth_date"
              placeholder="YYYY-MM-DD"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
