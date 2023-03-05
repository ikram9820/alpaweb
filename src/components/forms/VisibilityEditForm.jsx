import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVisibility } from "../../features/visibility";

function VisibilityEditForm() {
  const dispatch = useDispatch();
  const initVisibility = {
    professions: "",
    genders: "",
    countries: "",
    languages: "",
    min_age: 0,
    max_age: 0,
  };

  const [visibilityForm, setVisibilityForm] = useState(initVisibility);
  const isLoading = useSelector((state) => state.entities.visibility.isLoading);
  const visibility = useSelector(
    (state) => state.entities.visibility.visibility
  );

  useEffect(() => {
    if (visibility) {
      // visibility.min = visibility.ageRange.min;
      // visibility.max = visibility.ageRange.max;
      // visibility.ageRange = null;
      console.log(visibility);
      setVisibilityForm(visibility);
    }
  }, [visibility, isLoading, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const visibilityFilter = {
      professions: [],
      genders: [],
      countries: [],
      languages: [],
      ageRange: { min: 0, max: 0 },
    };
    visibilityFilter.countries = visibilityForm.countries.split(" ");
    visibilityFilter.genders = visibilityForm.genders.split(" ");
    visibilityFilter.languages = visibilityForm.languages.split(" ");
    visibilityFilter.professions = visibilityForm.professions.split(" ");
    visibilityFilter.ageRange.min = visibilityForm.min_age;
    visibilityFilter.ageRange.max = visibilityForm.max_age;
    console.log(visibilityFilter);
    dispatch(updateVisibility(visibilityFilter));
  };

  const handleInputChange = (event) => {
    setVisibilityForm({
      ...visibilityForm,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="row text-white">
      <div className="col-md-6 offset-md-3  mt-5">
        <form onSubmit={handleSubmit}>
          <p className="text-center">Your Profile</p>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="professions">
              Professions
            </label>
            <input
              type="text"
              name="professions"
              value={visibilityForm.professions}
              onChange={handleInputChange}
              id="professions"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="genders">
              Genders
            </label>
            <input
              type="text"
              name="genders"
              value={visibilityForm.genders}
              onChange={handleInputChange}
              id="genders"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="countries">
              Countries
            </label>
            <input
              type="text"
              name="countries"
              value={visibilityForm.countries}
              onChange={handleInputChange}
              id="countries"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="languages">
              languages
            </label>
            <input
              type="text"
              name="languages"
              value={visibilityForm.languages}
              onChange={handleInputChange}
              id="languages"
              className="form-control"
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label" htmlFor="min_age">
              Min Age
            </label>
            <input
              type="number"
              className="form-control"
              name="min_age"
              value={visibilityForm.min_age}
              onChange={handleInputChange}
              id="min_age"
              placeholder="enter min age"
              required
            />

            <label className="form-label" htmlFor="max_age">
              Max Age
            </label>
            <input
              type="number"
              className="form-control"
              name="max_age"
              value={visibilityForm.max_age}
              onChange={handleInputChange}
              id="max_age"
              placeholder="enter max age"
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

export default VisibilityEditForm;
