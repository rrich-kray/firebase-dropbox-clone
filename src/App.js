import "./App.css";
import Signup from "./components/Authentication/Signup/Signup";
import Profile from "./components/Authentication/Profile/Profile";
import Login from "./components/Authentication/Login/Login";
import ForgotPassword from "./components/Authentication/ForgotPassword/ForgotPassword";
import UpdateProfile from "./components/Authentication/UpdateProfile/UpdateProfile";
import Dashboard from "./components/drive/Dashboard/Dashboard";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/Authentication/PrivateRoute/PrivateRoute";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  // currentUser is undefined in both Dash and PrivateRoute, but not in login, signup, app. Can't pass it as prop from app component either?
  // first tries dashboard, then signup, then user??
  return (
    <div className="app">
      <Router>
        <Routes>
          {/* Profile Routes */}
          <Route
            exact
            path="/dashboard"
            element={currentUser ? <Dashboard /> : <Navigate to="/signup" />}
          />
          <Route
            exact
            path="/user"
            element={currentUser ? <Profile /> : <Navigate to="/signup" />}
          />
          <Route
            path="/update-profile"
            element={
              currentUser ? <UpdateProfile /> : <Navigate to="/signup" />
            }
          />

          {/* Auth routes  */}
          <Route
            exact
            path="/signup"
            element={currentUser ? <Navigate to="/user" /> : <Signup />}
          />
          <Route
            exact
            path="/login"
            element={currentUser ? <Navigate to="/user" /> : <Login />}
          />
          <Route
            exact
            path="/forgot-password"
            element={currentUser ? <Navigate to="/user" /> : <ForgotPassword />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
