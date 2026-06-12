import React, { useState, useEffect } from "react";
import axios from "axios";

const Funds = () => {
  const API = import.meta.env.VITE_API_URL;

  const [commodity, setCommodity] = useState(null);
  const [funds, setFunds] = useState(null);

  // ✅ Fetch commodity
  useEffect(() => {
    axios
      .get(`${API}/commodity`)
      .then((res) => setCommodity(res.data))
      .catch((err) => console.log(err));
  }, [API]);

  // ✅ Fetch funds
  useEffect(() => {
    axios
      .get(`${API}/funds`)
      .then((res) => setFunds(res.data))
      .catch((err) => console.log(err));
  }, [API]);

  // ✅ Open commodity
  const handleOpenCommodity = async () => {
    try {
      const res = await axios.post(`${API}/commodity/open`);
      setCommodity(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Add funds
  const handleAddFunds = async () => {
    const amount = prompt("Enter amount");
    if (!amount) return;

    try {
      const res = await axios.post(`${API}/addFunds`, {
        amount: Number(amount),
      });

      setFunds(res.data);
      alert("Funds added successfully");
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Withdraw funds
  const handleWithdraw = async () => {
    const amount = prompt("Enter withdrawal amount");
    if (!amount) return;

    try {
      const res = await axios.post(`${API}/withdraw`, {
        amount: Number(amount),
      });

      setFunds(res.data?.updatedFund || funds);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Withdrawal failed");
    }
  };

  // ✅ Loading state
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
          <button className="btn btn-green" onClick={handleAddFunds}>
            Add funds
          </button>

          <button className="btn btn-blue" onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </div>

      {/* Equity */}
      <div className="fund-card">
        <h3>Equity</h3>

        <div className="fund-list">
          <div className="fund-row">
            <span>Available margin</span>
            <strong>₹{funds?.availableMargin}</strong>
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

      {/* Commodity */}
      <div className="fund-card center-card">
        <h3>Commodity</h3>

        {commodity?.status === "NOT_OPEN" && (
          <>
            <p>You don't have a commodity account</p>

            <button className="btn btn-blue" onClick={handleOpenCommodity}>
              Open Account
            </button>
          </>
        )}

        {commodity?.status === "PENDING" && (
          <>
            <p>⏳ Account opening request submitted</p>
          </>
        )}

        {commodity?.status === "ACTIVE" && (
          <>
            <p>🎉 Commodity account active</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Funds;