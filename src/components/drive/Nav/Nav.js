import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav flex-row justify-between align-center">
      <div className="nav-left-container">
        <h1>Nav</h1>
      </div>
      <div className="nav-right-container">
        <button>
          <Link to="/profile">Profile</Link>
        </button>
      </div>
    </div>
  );
};

export default Nav;
