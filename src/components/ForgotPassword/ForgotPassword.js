import React, { useRef, useContext, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { ResetPassword } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await ResetPassword(emailRef.current.value);
      setTimeout(() => window.location.replace("/"), 3);
    } catch (e) {
      setError("Incorrect credentials provided");
    }

    setLoading(false);
  };

  return (
    <form className="signup" onSubmit={handleFormSubmit}>
      {loading ? (
        <div style={{ maxWidth: "100%" }}>
          <p>
            A link to reset your password has been emailed to the address
            provided. If you are not redirected shortly, please click this link:
          </p>
          <Link to="/signup" />
        </div>
      ) : (
        <>
          <h2 style={{ textAlign: "center" }}>Reset Password</h2>
          {error && <div className="error-modal">{error}</div>}
          <div className="email-container form-container">
            <label htmlFor="email">Email</label>
            <input name="email" id="email" ref={emailRef} />
          </div>
          <button className="submit-btn">Submit</button>
        </>
      )}
    </form>
  );
};

export default ForgotPassword;
