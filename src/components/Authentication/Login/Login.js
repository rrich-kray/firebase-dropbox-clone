import React, { useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const { navigate } = useNavigate();
  console.log(currentUser); // returns null vs. undefined in PrivateRoute component. currentUser does not exit in PrivateComponent, but does elsewhere

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      window.location.replace("/");
    } catch (e) {
      setError("Incorrect credentials provided");
    }

    setLoading(false);
  };

  return (
    <>
      <form className="login form" onSubmit={handleFormSubmit}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        {error && <div className="error-modal">{error}</div>}
        <div className="email-container form-container">
          <label htmlFor="email">Email</label>
          <input name="email" id="email" ref={emailRef} required />
        </div>
        <div className="password-container form-container">
          <label htmlFor="password">Password</label>
          <input name="password" id="password" ref={passwordRef} required />
        </div>
        <div className="need-account">
          Need and account? <Link to="/signup">Signup</Link>
        </div>
        <div className="forgot-password">
          Forgot Password? <Link to="/forgot-password">Forgot Password</Link>
        </div>
        <div onClick={logout}>Debugging Purposes</div>
        <button className="submit-btn form-btn">Submit</button>
      </form>
    </>
  );
};

export default Login;
