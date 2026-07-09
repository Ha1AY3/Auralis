import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../../features/auth/hooks/useAuth";
import logo from "../../assets/auralis.png";
import "../../styles/navbar.scss"

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleLogout } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    function logout(){
        handleLogout();
        navigate("/login");
    }
  return (
    <div className='navbar'>
        <div className='navbar-brand'>
            <Link to="/" className='logo-link'>
                <div className='logo-wrapper' >
                    <img src={logo} alt="Auralis" className='logo-image' />
                </div>
                <span className='logo-text'>Auralis</span>
            </Link>
        </div>

        <div className='navbar-right'>
            <div className='navbar-links'>
                <Link to="/favorites" className={`nav-link ${location.pathname === "/favorites" ? "active" : ""}`}>Liked Songs</Link>
                <Link to="/history" className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}>Emotion Timeline</Link>
            </div>

            <div className='navbar-actions'>
                <button onClick={logout} className='logout-btn'>Logout</button>
            </div>

              <button
                  className="hamburger"
                  onClick={() => setMenuOpen(!menuOpen)}
              >
                  ☰
              </button>

              {menuOpen && (
                  <div className="mobile-menu">

                      <Link
                          to="/favorites"
                          onClick={() => setMenuOpen(false)}
                      >
                          Liked Songs
                      </Link>

                      <Link
                          to="/history"
                          onClick={() => setMenuOpen(false)}
                      >
                          Emotion Timeline
                      </Link>

                      <button
                          onClick={() => {
                              logout();
                              setMenuOpen(false);
                          }}
                      >
                          Logout
                      </button>

                  </div>
              )}
        </div>
      
    </div>
  )
}

export default Navbar
