import React, { useState,useContext } from "react";
import { Tooltip } from "@mui/material";
import { watchlist } from "../data/data";
import GeneralContext from "./GeneralContext";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

const WatchList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search stocks..."
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <span className="counts">
          {filteredWatchlist.length} / {watchlist.length}
        </span>
      </div>

      <ul className="watchlist">
        {filteredWatchlist.map((stock, index) => (
          <WatchListItem key={index} stock={stock} />
        ))}
      </ul>
    </div>
  );
};

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  return (
    <li
      className="stock-item"
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      <div>
        <h4 className={stock.isDown ? "down" : "up"}>
          {stock.name}
        </h4>

        <p>₹{stock.price}</p>
      </div>

      <Tooltip
        title={`Change: ${stock.percent}`}
        placement="top"
        arrow
      >
        <span
          className={
            stock.isDown
              ? "change negative"
              : "change positive"
          }
        >
          {stock.isDown ? (
            <KeyboardArrowDown fontSize="small" />
          ) : (
            <KeyboardArrowUp fontSize="small" />
          )}

          {stock.percent}
        </span>
      </Tooltip>

      {showWatchlistActions && <WatchListActions uid={stock.name} />}

    </li>
  );
};

const WatchListActions = ({uid}) =>{
  const generalContext = useContext(GeneralContext);

  return (
  <span className="watchlist-actions">
  <Tooltip title="Buy" placement="top" arrow>
    <button className="action-btn buy-btn" onClick={() => generalContext.openBuyWindow(uid)}>
      Buy
    </button>
  </Tooltip>

  <Tooltip title="Sell" placement="top" arrow>
    <button className="action-btn sell-btn" onClick={() => generalContext.openSellWindow(uid)}>
      Sell
    </button>
  </Tooltip>

  <Tooltip title="Analytics" placement="top" arrow>
    <button className="icon-btn">
      <BarChartOutlined fontSize="small" />
    </button>
  </Tooltip>

  <Tooltip title="More" placement="top" arrow>
    <button className="icon-btn">
      <MoreHoriz fontSize="small" />
    </button>
  </Tooltip>
</span>
  )
};


export default WatchList;