import React from "react";

export const Nav = () => {
  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className="nav-link active" aria-current="page">
            AddContact
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link">View Contact</button>
        </li>
        <li className="nav-item">
          <button className="nav-link">ANSWER for Front End</button>
        </li>
      </ul>
    </div>
  );
};
