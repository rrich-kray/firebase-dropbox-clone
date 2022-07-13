import React, { useRef, useContext, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Please check your inbox for further instruction.");
      setTimeout(() => {
        setLoading(false);
        window.location.replace("/login");
      }, 3000);
    } catch (e) {
      setError("Incorrect credentials provided");
    }
  };

  return (
    <form
      className="reset-password form flex-col justify-center align-center"
      onSubmit={handleFormSubmit}
    >
      <h2 style={{ textAlign: "center" }}>Reset Password</h2>
      {message && (
        <div className="success-message">
          <p>{message}</p>
          <div>
            If you are not redirected, please click here:
            <Link to="/login">Login</Link>
          </div>
        </div>
      )}
      {error && <div className="error-modal">{error}</div>}
      <div className="email-container form-container">
        <label htmlFor="email">Email</label>
        <input name="email" id="email" ref={emailRef} />
      </div>
      {!loading && <button className="submit-btn form-btn">Submit</button>}
      <Link to="/login">Login</Link>
    </form>
  );
};

export default ForgotPassword;
