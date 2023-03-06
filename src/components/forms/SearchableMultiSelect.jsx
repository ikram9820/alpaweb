import React, { useEffect, useState } from "react";
import Input from "./Input";

const SearchableMultiSelect = ({ options, name, getSelectedOptions }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    // getSelectedOptions(selectedOptions);
    setSearchValue("");
    setIsCollapsed(true);
  };

  useEffect(() => {
    if (searchValue !== "") {
      setIsCollapsed(false);
      setFilterOptions(handleFilterOptions(options, searchValue));
    } else {
      setIsCollapsed(true);
      setFilterOptions([]);
    }
    // this function works here but lagging at handleOptionClick
    getSelectedOptions(selectedOptions);
  }, [selectedOptions, searchValue]);

  const handleFilterOptions = (options, value) => {
    return options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
  };

  return (
    <div className="multi-select-search">
      <div className="form-group my-2 mt-4">
        <div className="text-capitalize">Selected {name}:</div>
        {selectedOptions.map((option) => (
          <span key={option} className="py-2 pe-3 badge">
            {option},
          </span>
        ))}
      </div>
      <Input
        name={name}
        type={"text"}
        value={searchValue}
        handleInputChange={(e) => setSearchValue(e.target.value.trim())}
      />

      <div className="mb-3"></div>
      {!isCollapsed && (
        <ul className="list-group">
          {filterOptions.map((option) => (
            <li
              key={option}
              className={`list-group-item ${
                selectedOptions.includes(option) ? "active" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableMultiSelect;
