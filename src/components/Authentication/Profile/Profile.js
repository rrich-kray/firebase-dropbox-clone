import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();

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
          <button
            className="logout-btn form-btn flex-col justify-center align-center"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <button className="form-btn">
            <Link
              to="/update-profile"
              style={{
                textDecoration: "none",
                width: "100%",
                background: "background: rgb(203, 210, 227)",
              }}
            >
              Update Profile
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
