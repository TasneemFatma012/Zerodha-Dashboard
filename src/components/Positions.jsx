import React,{useState,useEffect} from "react";
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

const Positions = () => {

  const [allPositions,setAllPositions] = useState([]);
  useEffect(()=>{
    axios.get(`${API}/allPositions`)
    .then((res)=>{
      console.log(res.data);
      setAllPositions(res.data);

    });
  },[]);
  return (
    <div className="positions-container">
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="table-card">
        <table className="positions-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {allPositions?.map((stock, index) => {
              const qty = Number(stock.qty) || 0;
              const avg = Number(stock.avg) || 0;
              const ltp = Number(stock.ltp) || 0;

              const currentValue = qty * ltp;
              const investment = qty * avg;
              const pl = currentValue - investment;

              const profitClass = pl >= 0 ? "positive" : "negative";

              const netChange =
                investment !== 0
                  ? ((pl / investment) * 100).toFixed(2)
                  : "0.00";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.instrument}</td>
                  <td>{qty}</td>

                  <td>₹{avg.toFixed(2)}</td>
                  <td>₹{ltp.toFixed(2)}</td>

                  <td className={profitClass}>
                    {pl >= 0 ? "+" : ""}₹{pl.toFixed(2)}
                  </td>

                  <td className={profitClass}>
                    {netChange >= 0 ? "+" : ""}
                    {netChange}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="position-summary">
        <div className="summary-card">
          <h4>₹34,450</h4>
          <p>Current Value</p>
        </div>

        <div className="summary-card">
          <h4>₹34,500</h4>
          <p>Investment</p>
        </div>

        <div className="summary-card profit-card">
          <h4>₹-50</h4>
          <p>Net P&L</p>
        </div>
      </div>
    </div>
  );
};

export default Positions;