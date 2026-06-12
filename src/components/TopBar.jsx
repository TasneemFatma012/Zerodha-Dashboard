import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;
const TopBar = () => {

  const [markets, setMarkets] = useState([]);

 useEffect(() => {
    axios
      .get(`${API}/market`)
      .then((res) => {
        console.log("MARKET API:", res.data);

        
        setMarkets(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <header className="topbar">
      <div className="market-status">

       {(markets || []).map((market) => (
          <div className="market-card" key={market._id}>
            <span className="market-name">{market.name}</span>

            <span className="market-value">
              {market.value}
            </span>

            <span className="market-change positive">
              {market.change}
            </span>
          </div>
        ))}

      </div>

      <div className="topbar-menu">
        <Menu />
      </div>
    </header>
  );
};

export default TopBar;