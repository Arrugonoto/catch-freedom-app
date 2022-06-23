import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authProvider";

const Menu = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    setAuth(null);
    navigate("/");
  };

  return (
    <aside className="menu-container">
      <div className="user-wrapper">
        <div>
          <i className="fa-solid fa-user"></i>
        </div>
        <h1>{auth.name}</h1>
      </div>
      <nav className="menu-navigation">
        <div className="links-wrapper">
          <ul>
            <Link to="/dashboard" className="nav-link">
              <li>
                <i className="fa-solid fa-mobile-screen-button"></i>
                <p>Devices list</p>
              </li>
            </Link>
            <Link to="/devices/rented" className="nav-link">
              <li>
                <i className="fa-solid fa-clock"></i>
                <p>Rented devices</p>
              </li>
            </Link>
            <Link to="/manage" className="nav-link">
              <li>
                <i className="fa-solid fa-screwdriver-wrench"></i>
                <p>Manage devices</p>
              </li>
            </Link>
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

export default Menu;
