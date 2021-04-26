import React from "react";

const Filter = ({ state, handleChange, reset }) => {
  const genres = JSON.parse(localStorage.getItem("allItemGenres"));
  genres.unshift("-");

  const clearInputs = () => {
    reset();
  };

  return (
    <div className="pb-5 ">
      <form>
        <div className="field">
          <label className="label" htmlFor="minPrice">
            from
          </label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              name="minPrice"
              onChange={handleChange}
              value={state.minPrice}
              id="minPrice"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-dollar-sign"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="maxPrice">
            to
          </label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              name="maxPrice"
              onChange={handleChange}
              value={state.maxPrice}
              id="maxPrice"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-dollar-sign"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="genre">
            genre
          </label>
          <div className="control">
            <div className="select is-primary">
              <select
                value={state.genre}
                onChange={handleChange}
                name="genre"
                id="genre"
              >
                {genres.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="rating">
            rating
          </label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="number"
              min={0}
              max={5}
              name="rating"
              onChange={handleChange}
              value={state.rating}
              id="rating"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-sort-numeric-down-alt"></i>
            </span>
          </div>
        </div>
        <div className="field has-text-centered">
          <button className="button is-rounded" type="button" onClick={clearInputs}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
