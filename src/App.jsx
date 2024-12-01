import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Livetv from "./components/Livetv";
import Tvshows from "./components/Tvshows";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ConditionalNavbar = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/forgot-password"];
  return !hideNavbarRoutes.includes(location.pathname) ? <Navbar /> : null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/livetv" element={<Livetv />} />
        <Route path="/tvshows" element={<Tvshows />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
