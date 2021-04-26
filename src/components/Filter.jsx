import React from "react";

const Filter = ({ state, handleChange, reset }) => {
  const genres = JSON.parse(localStorage.getItem("allItemGenres"));
  genres.unshift("-")

  const clearInputs = () => {
    reset();
  };

  return (
    <div className="pb-5">
      <form>
        <div className="field">
          <label className="label" htmlFor="minPrice">
            from
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="minPrice"
              onChange={handleChange}
              value={state.minPrice}
              id="minPrice"
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="maxPrice">
            to
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="maxPrice"
              onChange={handleChange}
              value={state.maxPrice}
              id="maxPrice"
            />
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
                  <option key={index} value={genre} >
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
          <div className="control">
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
          </div>
        </div>
        <button className="button" type="button" onClick={clearInputs}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default Filter;
