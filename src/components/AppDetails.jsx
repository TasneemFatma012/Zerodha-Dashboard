import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;


const AppDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    fetchApp();

  }, []);



  const fetchApp = async () => {

    try {

      const res = await axios.get(`${API}/apps/${id}`);

      console.log("App Detail:", res.data);

      setApp(res.data);


    } catch (err) {

      console.log("Error:", err);

    } finally {

      setLoading(false);

    }

  };



  if (loading) {

    return (
      <div className="app-detail">
        <h2>Loading App...</h2>
      </div>
    );

  }



  if (!app) {

    return (
      <div className="app-detail">
        <h2>App Not Found</h2>
      </div>
    );

  }



  return (

    <div className="app-detail">


      <div
        className="app-detail-icon"
        style={{
          background: app.color
        }}
      >

        {app.name.charAt(0)}

      </div>



      <h1>
        {app.name}
      </h1>



      <p>
        {app.desc}
      </p>



      <div className="features-box">

        <h3>
          Features
        </h3>


        <ul>

          {
            app.features?.map((feature,index)=>(

              <li key={index}>
                ✓ {feature}
              </li>

            ))
          }

        </ul>


      </div>




      <button

        onClick={()=>navigate(app.path)}

        className="open-btn"

      >

        Open App

      </button>



    </div>

  );

};


export default AppDetail;