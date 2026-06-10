import React from "react";
import { useNavigate } from "react-router-dom";
const Apps = () => {
  const navigate = useNavigate();
  const apps = [
    {
      name: "Kite",
      desc: "Trading platform for stocks & derivatives",
      color: "#387ed1",
      path: "/",
    },
    {
      name: "Console",
      desc: "Portfolio reports & analytics",
      color: "#16a34a",
      path: "/holdings",
    },
    {
      name: "Coin",
      desc: "Mutual fund investments",
      color: "#f59e0b",
      path: "/funds",
    },
    {
      name: "Varsity",
      desc: "Learning platform for trading",
      color: "#8b5cf6",
      path: "/orders",
    },
  ];

  return (
    <div className="apps-container">
      <h2>Apps</h2>
      <p className="subtext">Your trading ecosystem tools</p>

      <div className="apps-grid">
        {apps.map((app, index) => (
          <div key={index} className="app-card" onClick={() => navigate(app.path)}> 
            <div
              className="app-icon"
              style={{ background: app.color }}
            >
              {app.name.charAt(0)}
            </div>

            <div>
              <h3>{app.name}</h3>
              <p>{app.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;