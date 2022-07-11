import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      window.location.replace("/");
    } catch (e) {
      setError("Incorrect credentials provided");
    }

    setLoading(false);
  };

  return (
    <>
      <form className="signup" onSubmit={handleFormSubmit}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        {error && <div className="error-modal">{error}</div>}
        <div className="email-container form-container">
          <label htmlFor="email">Email</label>
          <input name="email" id="email" ref={emailRef} />
        </div>
        <div className="password-container form-container">
          <label htmlFor="password">Password</label>
          <input name="password" id="password" ref={passwordRef} />
        </div>
        <div className="need-account">
          Need and account? <Link to="/signup">Signup</Link>
        </div>
        <div className="forgot-password">
          Forgot Password? <Link to="/forgot-password">Forgot Password</Link>
        </div>
        <button className="submit-btn">Submit</button>
      </form>
    </>
  );
};

export default Login;
