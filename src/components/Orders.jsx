import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchOrders();
  }, []);


  const fetchOrders = async () => {
    try {

      const res = await axios.get(`${API}/orders`);
      console.log("FULL RESPONSE:", res);
      console.log("DATA:", res.data);


      console.log("Orders API:", res.data);


      // handle object + array response
      const orderData = Array.isArray(res.data)
        ? res.data
        : res.data.orders || [];


      setOrders(orderData);


    } catch (err) {

      console.error("Error fetching orders:", err);
      setOrders([]);

    } finally {

      setLoading(false);

    }
  };



  const totalBuyOrders = orders.filter(
    (order) => order.mode === "BUY"
  ).length;


  const totalSellOrders = orders.filter(
    (order) => order.mode === "SELL"
  ).length;



  return (
    <div className="orders-page">


      <div className="orders-header">

        <div>

          <h2 className="title">
            Orders
          </h2>

          <p className="subtext">
            Track all your buy and sell transactions
          </p>

        </div>

      </div>



      <div className="orders-summary">


        <div className="summary-card">

          <h4>
            {orders.length}
          </h4>

          <p>
            Total Orders
          </p>

        </div>



        <div className="summary-card">

          <h4 className="positive">
            {totalBuyOrders}
          </h4>

          <p>
            Buy Orders
          </p>

        </div>



        <div className="summary-card">

          <h4 className="negative">
            {totalSellOrders}
          </h4>

          <p>
            Sell Orders
          </p>

        </div>


      </div>





      {
        loading ? (

          <div className="orders-card">

            <h2>
              Loading Orders...
            </h2>

          </div>


        ) : orders.length === 0 ? (


          <div className="orders-card">

            <div className="orders-icon">
              📋
            </div>


            <h2>
              No Orders Yet
            </h2>


            <p>
              Your executed trades will appear here.
            </p>


          </div>



        ) : (


          <div className="table-card">


            <table className="holdings-table">


              <thead>

                <tr>

                  <th>
                    Stock
                  </th>

                  <th>
                    Qty
                  </th>

                  <th>
                    Price
                  </th>

                  <th>
                    Type
                  </th>


                </tr>


              </thead>




              <tbody>


                {
                  orders.map((order)=>(


                    <tr key={order._id}>


                      <td>
                        {order.name}
                      </td>


                      <td>
                        {order.qty}
                      </td>


                      <td>
                        ₹{Number(order.price).toFixed(2)}
                      </td>



                      <td>


                        <span

                          className={
                            order.mode === "BUY"
                            ? "change positive"
                            : "change negative"
                          }

                        >

                          {order.mode}

                        </span>


                      </td>



                    </tr>



                  ))
                }


              </tbody>


            </table>


          </div>


        )

      }



    </div>
  );
};


export default Orders;