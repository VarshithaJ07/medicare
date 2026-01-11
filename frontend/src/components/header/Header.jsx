import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            +
          </div>
          <span className="font-semibold text-lg">Medicare</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/">Home</Link>
          <Link to="/doctors">Find a Doctor</Link>
          <Link to="/services">Services</Link> {/* 🔹 ADDED */}
          <Link to="/contact">Contact</Link>   {/* 🔹 ADDED */}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="hidden md:inline text-slate-700">
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                className="px-4 py-1.5 rounded-full border border-slate-300 hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden md:inline">
                Login
              </Link>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
