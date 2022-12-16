import React from "react";

export const Nav = ({ currentTab, changeTab}) => {
    
  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className="nav-link active" aria-current="page" onClick={()=>changeTab('addContact')}>
            AddContact
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={()=>changeTab('viewContacts')} >View Contact</button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={()=>changeTab('frontendTest')}>ANSWER for Front End</button>
        </li>
      </ul>
    </div>
  );
};
