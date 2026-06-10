import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";

const TopBar = () => {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/market")
      .then((res) => setMarkets(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <header className="topbar">
      <div className="market-status">

        {markets.map((market) => (
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