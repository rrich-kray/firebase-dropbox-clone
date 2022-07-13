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
  const signup = async (email, password) => {
    const userData = await auth.createUserWithEmailAndPassword(email, password);
    setCurrentUser(userData.user._delegate);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };
  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
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
    resetPassword,
    updateEmail,
    updatePassword,
  };
  // returning value of currentUser in AuthContext.Provider so that it can be used anywhere in the application
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
