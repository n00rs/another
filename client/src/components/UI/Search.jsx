import React from "react";

export const Search = ({ onChange ,search}) => {
  return (
    <div className="input-group d-flex justify-content-end mb-2">
      <div className="form-outline">
        <input type="search" id="form1" className="form-control" onChange={onChange} />
      </div>
      <button type="button" className="btn btn-primary" onClick={search}>
        {/* <i className="fas fa-search"></i> */}
        search
      </button>
    </div>
  );
};
