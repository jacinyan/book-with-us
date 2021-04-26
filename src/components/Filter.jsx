import React from "react";

const Filter = ({ state, handleChange, reset }) => {
  const clearInputs = () => {
    reset();
  };

  return (
    <>
      From
      <input
        type="text"
        name="minPrice"
        onChange={handleChange}
        value={state.minPrice}
      />
      To
      <input
        type="text"
        name="maxPrice"
        onChange={handleChange}
        value={state.maxPrice}
      />
      Genre
      <input
        type="text"
        name="genre"
        onChange={handleChange}
        value={state.genre}
      />
       Rating
      <input
        type="text"
        name="rating"
        onChange={handleChange}
        value={state.rating}
      />
      <button type="button" onClick={clearInputs}>
        Reset
      </button>
    </>
  );
};

export default Filter;
