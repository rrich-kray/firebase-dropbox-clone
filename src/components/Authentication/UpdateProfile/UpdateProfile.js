import React, { useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updateEmail, updatePassword } = useAuth();
  // Signup component is wrapped in AuthProvider component, which returns the AuthContext.Provider, which provides context that is defined by the user
  // This means it has access to context that AuthProvider provides, which consists of the currentUser value, login and signup functions. Whatever is defined by the user in the AuthProvider component
  // This component can access this context through the useAuth function, which invokes the useContext function with AuthContext passed as an argument.

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        window.location.replace("/user");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });

    setLoading(false);
  };

  return (
    <>
      <form className="update-profile form" onSubmit={handleFormSubmit}>
        <h2 style={{ textAlign: "center" }}>Update Profile</h2>
        {error && <div className="error-modal">{error}</div>}
        <div className="email-container form-container">
          <label htmlFor="email">Email</label>
          <input name="email" id="email" ref={emailRef} />
        </div>
        <div className="password-container form-container">
          <label htmlFor="password">Password</label>
          <input name="password" id="password" ref={passwordRef} />
        </div>
        <div className="password-confirm-container form-container">
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            name="password-confirm"
            id="password-confirm"
            ref={passwordConfirmRef}
          />
        </div>
        <button className="submit-btn form-btn">Submit</button>
      </form>
    </>
  );
};

export default UpdateProfile;
