import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBox = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <div className="navbar-item">
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input is-rounded is-default"
              type="text"
              placeholder="Find a book..."
              name="q"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <p className="control ">
            <button className="button is-rounded is-default is-primary">
              Search
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
