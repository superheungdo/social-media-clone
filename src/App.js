import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/NotFound";

const App = () => {
  const isLoggedIn = useSelector((state) => state.authReducer.authData);

  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="home" /> : <Navigate to="auth" />}
        />

        <Route
          path="/auth"
          element={isLoggedIn ? <Navigate to="/home" /> : <Auth />}
        />

        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/auth" />}
        />

        <Route
          path="/profile/:id"
          element={isLoggedIn ? <Profile /> : <Navigate to="/auth" />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
