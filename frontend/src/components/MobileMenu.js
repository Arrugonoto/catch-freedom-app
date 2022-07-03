import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/authProvider";

const MobileMenu = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const logoutUser = () => {
    setAuth(null);
    navigate("/");
  };

  return (
    <aside className={`mobile-menu-container ${isExpanded ? "expanded" : ""}`}>
      <div className="menu-btn-wrapper">
        <button
          onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
          className="btn btn-menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <div className="user-wrapper">
        <div>
          <i className="fa-solid fa-user"></i>
        </div>
        <h1>{auth.username}</h1>
      </div>
      <nav className="menu-navigation">
        <div className="links-wrapper">
          <ul>
            <li>
              <NavLink to="/dashboard" className="nav-link">
                <i className="fa-solid fa-mobile-screen-button"></i>
                <p>Devices list</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/devices/rented" className="nav-link">
                <i className="fa-solid fa-clock"></i>
                <p>Rented devices</p>
              </NavLink>
            </li>
            {auth.userRole === "administrator" && (
              <li>
                <NavLink to="/manage" className="nav-link">
                  <i className="fa-solid fa-screwdriver-wrench"></i>
                  <p>Manage devices</p>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="logout-wrapper">
          <button onClick={logoutUser} className="btn-logout">
            <i className="fa-solid fa-power-off"></i>
            <p>Logout</p>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default MobileMenu;
