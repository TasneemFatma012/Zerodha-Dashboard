import React,{useState,useEffect} from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", value: 28000 },
  { day: "Tue", value: 29500 },
  { day: "Wed", value: 29100 },
  { day: "Thu", value: 30500 },
  { day: "Fri", value: 31430 },
];

const Summary = () => {
 
  const [funds, setFunds] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Funds
    axios
      .get(`${API}/funds`)
      .then((res) => setFunds(res.data))
      .catch((err) => console.log(err));
      // Holdings
    axios
    .get(`${API}/allHoldings`)
    .then((res) => {
      console.log("HOLDINGS:", res.data);

      setHoldings(Array.isArray(res.data) ? res.data : []);
    })
    .catch((err) => console.log(err));


    // User Profile
    axios
      .get(`${API}/users/profile`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
  }, []);
  // Portfolio Calculations
  const investment = Array.isArray(holdings)
  ? holdings.reduce((sum, item) => sum + item.price * item.qty, 0)
  : 0;

  const currentValue = holdings.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const profit = currentValue - investment;

  const profitPercent =
    investment > 0
      ? ((profit / investment) * 100).toFixed(2)
      : 0;



  return (
    <div className="summary-container">
      <div className="welcome-card">
        <h2>Hi, {profile?.username || "User"} 👋</h2>
        <p>Welcome back to your trading dashboard</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Margin Available</h4>
          <h2>₹{funds?.availableMargin || 0}</h2>
        </div>

        <div className="stat-card">
          <h4>Current Value</h4>
          <h2>₹{currentValue.toFixed(2)}</h2>
        </div>

        <div className="stat-card profit-card">
          <h4>Total P&L</h4>
          <h2>₹{profit.toFixed(2)}</h2>
          <span>+{profitPercent}%</span>
        </div>
      </div>

      <div className="chart-card">
        <h3>Portfolio Performance</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#387ed1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="holdings-card">
        <h3>Holdings Overview</h3>

        <div className="holding-row">
          <span>Investment</span>
          <strong>₹{investment.toFixed(2)}</strong>
        </div>

        <div className="holding-row">
          <span>Current Value</span>
          <strong>₹{currentValue.toFixed(2)}</strong>
        </div>

        <div className="holding-row profit">
          <span>Profit</span>
          <strong>₹{profit.toFixed(2)} ({profitPercent}%)</strong>
        </div>
        <div className="holding-row">
          <span>Total Holdings</span>
          <strong>{holdings.length}</strong>
        </div>
      </div>
    </div>
  );
};

export default Summary;