import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Dash.css";

const Dash = () => {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const { currentUser } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout();
      window.location.replace("/signup");
    } catch (e) {
      setError("Failed to logout!");
    }
  };

  return (
    <div className="dash">
      <div className="dash-main-container">
        <div className="content-container">
          <h1>Profile</h1>
          <strong style={{ marginBottom: "10px" }}>
            Email: {currentUser.email}
          </strong>
        </div>
        <div className="logout-container">
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dash;
