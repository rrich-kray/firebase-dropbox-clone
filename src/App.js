import "./App.css";
import Signup from "./components/Signup/Signup";
import Dash from "./components/Dash/Dash";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Dash />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
