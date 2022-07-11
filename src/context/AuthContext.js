import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase";

// workflow:
// AuthContext is provided by the AuthProvider defined below
// useAuth uses contex created by AuthContext
// Signup form uses useAuth() function
// useAuth function uses AuthContext, which provides the value of current user
// Value of currentUser

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  // if you're not using Firebase, you can simply change the login and signup functiokn below to make requests to your server instead
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const ResetPassword = (email) => {
    return auth.ResetPassword(email);
  };

  useEffect(() => {
    // this function returns the method unsubscribe, and when we call this method, it will unsubscribe the onAuthStateChanged listener whenever we unmount the component
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    ResetPassword,
  };
  // returning value of currentUser in AuthContext.Provider so that it can be used anywhere in the application
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
