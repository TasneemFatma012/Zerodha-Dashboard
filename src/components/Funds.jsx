import React ,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Funds = () => {
  const API = "https://zerodha-backend-z9ph.onrender.com";
  const [commodity, setCommodity] = useState(null);
  useEffect(() => {
  axios.get(`${API}/commodity`)
    .then((res) => setCommodity(res.data))
    .catch((err) => console.log(err));
}, []);

const handleOpenCommodity = async () => {
  const res = await axios.post(`${API}/commodity/open`);
  setCommodity(res.data);
};

  const [funds, setFunds] = useState(null);
  const handleAddFunds = async () => {
  const amount = prompt("Enter amount");

  if (!amount) return;

  try {
    const res = await axios.post(
      `${API}/addFunds`,
      {
        amount: Number(amount),
      }
    );

    setFunds(res.data);

    alert("Funds added successfully");
  } catch (err) {
    console.log(err);
  }
};
  useEffect(() => {
  axios
    .get(`${API}/funds`)
    .then((res) => {
      setFunds(res.data);
    })
    .catch((err) => console.log(err));
}, []);

const handleWithdraw = async () => {
  const amount = prompt("Enter withdrawal amount");

  if (!amount) return;

  try {
    const res = await axios.post(
      `${API}/withdraw`,
      {
        amount: Number(amount),
      }
    );

    setFunds(res.data.updatedFund);

    alert(res.data.message);
  } catch (err) {
    alert(err.response?.data?.message || "Withdrawal failed");
  }
};
if (!funds) {
  return (
    <div className="funds-container">
      <h2>Loading Funds...</h2>
    </div>
  );
}

  return (
    <div className="funds-container">
      {/* Top Actions */}
      <div className="funds-header">
        <p>Instant, zero-cost fund transfers with UPI</p>

        <div className="funds-actions">
          <Link className="btn btn-green"  onClick={handleAddFunds}>Add funds</Link>
          <Link className="btn btn-blue" onClick={handleWithdraw}>Withdraw</Link>
        </div>
      </div>

      {/* Main Section */}
      <div className="funds-grid">
        {/* Equity Card */}
        <div className="fund-card">
          <h3>Equity</h3>

          <div className="fund-list">
            <div className="fund-row">
              <span>Available margin</span>
              <strong className="highlight">  ₹{funds?.availableMargin}</strong>
            </div>

            <div className="fund-row">
              <span>Used margin</span>
              <strong>₹{funds?.usedMargin}</strong>
            </div>

            <div className="fund-row">
              <span>Available cash</span>
              <strong>₹{funds?.availableCash}</strong>
            </div>

            <hr />

            <div className="fund-row">
              <span>Opening balance</span>
              <span>₹{funds?.openingBalance}</span>
            </div>

            <div className="fund-row">
              <span>Payin</span>
              <span>₹{funds?.payin}</span>
            </div>

            <div className="fund-row">
              <span>SPAN</span>
              <span>₹{funds?.span}</span>
            </div>

            <div className="fund-row">
              <span>Exposure</span>
              <span>₹{funds?.exposure}</span>
            </div>

            <hr />

            <div className="fund-row">
              <span>Total Collateral</span>
              <span>₹{funds?.totalCollateral}</span>
            </div>
          </div>
        </div>

       {/* Commodity Card */}
<div className="fund-card center-card">
  <h3>Commodity</h3>

  {/* Account Not Open */}
  {commodity?.status === "NOT_OPEN" && (
    <>
      <p>You don't have a commodity account</p>

      <div className="commodity-benefits">
        <p>✔ Trade Gold</p>
        <p>✔ Trade Silver</p>
        <p>✔ Trade Crude Oil</p>
        <p>✔ Real-time Market Access</p>
      </div>

      <button
        className="btn btn-blue"
        onClick={handleOpenCommodity}
      >
        Open Account
      </button>
    </>
  )}

  {/* Account Pending */}
  {commodity?.status === "PENDING" && (
    <>
      <p>⏳ Account opening request submitted</p>
      <p>Your documents are under verification.</p>

      <div className="commodity-status">
        <p>Step 1: Application Submitted ✅</p>
        <p>Step 2: Verification In Progress ⏳</p>
        <p>Step 3: Account Activation ⏳</p>
      </div>
    </>
  )}

  {/* Account Active */}
  {commodity?.status === "ACTIVE" && (
    <>
      <p>🎉 Your commodity account is active</p>

      <hr />

      <div className="commodity-summary">
        <div className="fund-row">
          <span>Available Margin</span>
          <strong>₹50,000</strong>
        </div>

        <div className="fund-row">
          <span>Available Cash</span>
          <strong>₹25,000</strong>
        </div>

        <div className="fund-row">
          <span>Today's P&L</span>
          <strong className="highlight">+₹1,250</strong>
        </div>
      </div>

      <hr />

      <h4>Commodity Watchlist</h4>

      <div className="commodity-watchlist">
        <div className="fund-row">
          <span>🥇 Gold</span>
          <span>₹95,400</span>
        </div>

        <div className="fund-row">
          <span>🥈 Silver</span>
          <span>₹1,08,500</span>
        </div>

        <div className="fund-row">
          <span>🛢 Crude Oil</span>
          <span>₹6,820</span>
        </div>
      </div>

      <hr />

      <h4>Recent Orders</h4>

      <ul className="commodity-orders">
        <li>BUY Gold - 1 Lot</li>
        <li>SELL Silver - 2 Lots</li>
        <li>BUY Crude Oil - 1 Lot</li>
      </ul>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
          flexWrap: "wrap",
        }}
      >
        <button className="btn btn-green">
          Trade Commodities
        </button>

        <button className="btn btn-blue">
          View Positions
        </button>
      </div>
    </>
  )}
  </div>
  </div>
</div>
  
  );
};

export default Funds;