import React, { useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = ({ currentUser }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  // const { currentUser } = useAuth();
  console.log(currentUser);
  // Signup component is wrapped in AuthProvider component, which returns the AuthContext.Provider, which provides context that is defined by the user
  // This means it has access to context that AuthProvider provides, which consists of the currentUser value, login and signup functions. Whatever is defined by the user in the AuthProvider component
  // This component can access this context through the useAuth function, which invokes the useContext function with AuthContext passed as an argument.

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      window.location.replace("/user");
    } catch (e) {
      setError("Failed to register");
    }

    setLoading(false);
  };

  return (
    <>
      <form className="signup form" onSubmit={handleFormSubmit}>
        <h2 style={{ textAlign: "center" }}>Signup</h2>
        {error && <div className="error-modal">{error}</div>}
        <div className="email-container form-container">
          <label htmlFor="email">Email</label>
          <input name="email" id="email" ref={emailRef} required />
        </div>
        <div className="password-container form-container">
          <label htmlFor="password">Password</label>
          <input name="password" id="password" ref={passwordRef} required />
        </div>
        <div className="password-confirm-container form-container">
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            name="password-confirm"
            id="password-confirm"
            ref={passwordConfirmRef}
            required
          />
        </div>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Login</Link>
        </div>
        <button className="submit-btn form-btn">Submit</button>
      </form>
    </>
  );
};

export default Signup;
