import React from "react";
import "./CenteredContainer.css";

const CenteredContainer = ({ children }) => {
  return (
    <div className="centered-container flex-row justify-center align-center">
      {children}
    </div>
  );
};

export default CenteredContainer;
