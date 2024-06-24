import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./assets/searchbar.css";

const SearchBar = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputFocus = () => {
    setIsActive(true);
  };

  const handleInputBlur = () => {
    if (!searchTerm) {
      setIsActive(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsActive(false);
  };

  return (
    <>
      <div className="title">DASHBOARD</div>
      <div className={`search-bar ${isActive ? "active" : ""}`}>
        <div className="search-container">
          <div className="search-icon-container">
            {!searchTerm ? (
              <FontAwesomeIcon
                icon={faSearch}
                className="search-icon"
                onClick={handleInputFocus}
              />
            ) : (
              <FontAwesomeIcon
                icon={faTimes}
                className="clear-icon"
                onClick={handleClearSearch}
              />
            )}
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="search-input"
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
