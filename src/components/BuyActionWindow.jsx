import React, { useContext } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import GeneralContext from "./GeneralContext";
import { useState } from "react";

const BuyActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  const [stockQuantity,setStockQuantity] = useState(1);
  const [stockPrice,setStockPrice] = useState(0.0);

 const handleBuyClick = async () => {
  console.log("Buy button clicked");

  try {
    const res = await axios.post("http://localhost:5000/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
    });

    console.log(res.data);

    generalContext.closeBuyWindow();
  } catch (err) {
    console.log(err);
  }
};

  const handleCancelClick =() =>{
    GeneralContext.closeBuyWindow();
  };
  return (
    <div className="containerClass" id="buy-window" draggable="true">
      <div className="regular-order">
        <h3 className="order-title">Buy Order</h3>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
              <input type="number" name="qty" id="qty" onChange={(e)=>setStockQuantity(e.target.value)} value={stockQuantity} />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
              <input type="number" name="price" id="price" step="0.05" onChange={(e)=>setStockPrice(e.target.value)} value={stockPrice} />
          </fieldset>

        </div>
      </div>
      
      <div className="buttons">
        <span> Margin required 140.65 </span>
          <div  className="action-group">
            <button className="btn btn-blue" onClick={handleBuyClick}>Buy</button>
            <Link to="" className="btn btn-grey" onClick={handleCancelClick}>Cancel</Link>
          </div>
       
      </div>
    </div>
  );
};

export default BuyActionWindow;