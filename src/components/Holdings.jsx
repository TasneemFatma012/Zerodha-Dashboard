import React, { useState, useEffect } from "react";
import axios from "axios";

const Holdings = () => {
  const API = import.meta.env.VITE_API_URL;

  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/allHoldings`)
      .then((res) => {
        console.log("HOLDINGS:", res.data);

        setAllHoldings(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.log(err));
  }, [API]);

  return (
    <div className="holdings-container">
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="table-card">
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. Cost</th>
              <th>LTP</th>
              <th>Cur. Val</th>
              <th>P&L</th>
              <th>Net Chg.</th>
              <th>Day Chg.</th>
            </tr>
          </thead>

          <tbody>
            {(allHoldings || []).map((stock) => {
              const qty = Number(stock.qty || 0);
              const avg = Number(stock.avg || 0);
              const price = Number(stock.price || 0);

              const currentValue = qty * price;
              const pl = currentValue - qty * avg;
              const profitClass = pl >= 0 ? "positive" : "negative";

              const netChange = ((pl / (qty * avg || 1)) * 100).toFixed(2);
              const dayChange = stock.day || "0%";

              return (
                <tr key={stock._id || stock.name}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>₹{avg.toFixed(2)}</td>
                  <td>₹{price.toFixed(2)}</td>
                  <td>₹{currentValue.toFixed(2)}</td>

                  <td className={profitClass}>
                    {pl >= 0 ? "+" : ""}₹{pl.toFixed(2)}
                  </td>

                  <td className={profitClass}>
                    {netChange >= 0 ? "+" : ""}{netChange}%
                  </td>

                  <td className={dayChange.includes("+") ? "positive" : "negative"}>
                    {dayChange}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="holdings-summary">
        <div className="summary-card">
          <h4>₹29,875.55</h4>
          <p>Total Investment</p>
        </div>

        <div className="summary-card">
          <h4>₹31,428.95</h4>
          <p>Current Value</p>
        </div>

        <div className="summary-card profit-card">
          <h4>₹1,553.40 (+5.20%)</h4>
          <p>Total P&L</p>
        </div>
      </div>
    </div>
  );
};

export default Holdings;