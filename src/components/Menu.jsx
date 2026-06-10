import React,{ useState,useEffect} from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
const Menu = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const [profile, setProfile] = useState(null);

   useEffect(() => {
     axios
      .get("http://localhost:5000/users/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
    }, []);

  return (
    <nav className="menu-container">
      <div className="logo-section">
        {/* <img src="./public/logo.png" alt="Logo" className="logo" /> */}
        <h3>Zerodha</h3>
      </div>

      <ul className="menu-list">
        <li className="active">
           <NavLink to="/" end>
             Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders">
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/holdings">
            Holdings
          </NavLink>
        </li>
        <li>
          <NavLink to="/positions">
            Positions
          </NavLink>
        </li>
        <li>
          <NavLink to="/funds">
            Funds
          </NavLink>
        </li>
        <li>
          <NavLink to="/apps">
            Apps
          </NavLink>
        </li>
      </ul>

      <div className="profile-card" onClick={handleProfileClick}>
        <div className="avatar"> {profile?.username?.slice(0, 2).toUpperCase()} </div>
        <div>
          <p className="username">
            {profile?.username}
          </p>
          <span className="role">{profile?.role}</span>
        </div>
      </div>
    </nav>
  );
};

export default Menu;