import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVisibility } from "../../features/visibility";
import SearchableMultiSelect from "./SearchableMultiSelect";
import {
  countries,
  professions,
  languages,
} from "../../name_list/visibility_filter";
import Input from "./Input";
function VisibilityEditForm() {
  const dispatch = useDispatch();

  const initAgeRange = {
    min: 0,
    max: 0,
  };
  const [ageRange, setAgeRange] = useState(initAgeRange);
  const isLoading = useSelector((state) => state.entities.visibility.isLoading);
  const visibility = useSelector(
    (state) => state.entities.visibility.visibility
  );
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);

  useEffect(() => {
    console.log("visibility :",
      selectedCountries,
      selectedGenders,
      selectedLanguages,
      selectedProfessions
    );
  }, [
    selectedCountries,
    selectedGenders,
    selectedLanguages,
    selectedProfessions,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const visibilityFilter = {
      professions: [],
      genders: [],
      countries: [],
      languages: [],
      ageRange: { min: 0, max: 0 },
    };
    console.log(
      selectedCountries,
      selectedGenders,
      selectedLanguages,
      selectedProfessions
    );
    visibilityFilter.professions = selectedProfessions;
    visibilityFilter.genders = selectedGenders;
    visibilityFilter.countries = selectedCountries;
    visibilityFilter.languages = selectedLanguages;
    visibilityFilter.ageRange.min = ageRange.min;
    visibilityFilter.ageRange.max = ageRange.max;
    // console.log(visibilityFilter);
    dispatch(updateVisibility(visibilityFilter));
  };

  const handleInputChange = (event) => {
    setAgeRange({
      ...ageRange,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="row text-white">
      <div className="col-md-6 offset-md-3  mt-5">
        <form onSubmit={handleSubmit}>
          <p className="text-center">Your Profile</p>

          <SearchableMultiSelect
            name={"professions"}
            options={professions}
            getSelectedOptions={(list) => setSelectedProfessions(list)}
          />
          <SearchableMultiSelect
            name={"countries"}
            options={countries}
            getSelectedOptions={(list) => setSelectedCountries(list)}
          />
          <SearchableMultiSelect
            name={"languages"}
            options={languages}
            getSelectedOptions={(list) => setSelectedLanguages(list)}
          />
          <SearchableMultiSelect
            name={"genders"}
            options={["Male", "Female", "Other"]}
            getSelectedOptions={(list) => setSelectedGenders(list)}
          />

          <div className="form-group d-flex mb-3">
            <div className="me-5">
              <Input
                name={"min_age"}
                type={"number"}
                value={ageRange.min}
                handleInputChange={handleInputChange}
              />
            </div>
            <div>
              <Input
                name={"max_age"}
                type={"number"}
                value={ageRange.max}
                handleInputChange={handleInputChange}
              />
            </div>
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
