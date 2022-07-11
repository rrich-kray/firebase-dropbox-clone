import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./PrivateRoute.css";

// export const PrivateRoute = ({ component: Component, ...rest }) => {
//   // This is just a wrapper for our current route
//   const { currentUser } = useAuth();
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return currentUser ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/login" />
//         );
//       }}
//     ></Route>
//   );
// };

export const PrivateRoute = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
