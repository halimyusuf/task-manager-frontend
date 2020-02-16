import React from "react";

const Search = ({ ...all }) => {
  return (
    <React.Fragment>
      <form>
        <div className="form-group">
          <input
            {...all}
            type="search"
            className="form-control home-search"
            placeholder="Search"
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default Search;
