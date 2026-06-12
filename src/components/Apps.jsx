import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;


const Apps = () => {

  const navigate = useNavigate();

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    fetchApps();

  }, []);



  const fetchApps = async () => {

    try {

      const res = await axios.get(`${API}/apps`);

      console.log("Apps Data:", res.data);

      setApps(res.data);


    } catch (err) {

      console.log("Error fetching apps:", err);

    } finally {

      setLoading(false);

    }

  };




  return (

    <div className="apps-container">


      <h2>
        Apps
      </h2>


      <p className="subtext">
        Your trading ecosystem tools
      </p>



      {
        loading ? (

          <h3>
            Loading Apps...
          </h3>


        ) : (


          <div className="apps-grid">


            {
              apps.map((app)=>(
                

                <div

                key={app._id}

                className="app-card"

                onClick={()=>navigate(`/apps/${app._id}`)}

                >



                  <div

                  className="app-icon"

                  style={{
                    background:app.color
                  }}

                  >

                    {app.name.charAt(0)}


                  </div>




                  <div>


                    <h3>
                      {app.name}
                    </h3>


                    <p>
                      {app.desc}
                    </p>


                  </div>



                </div>


              ))
            }



          </div>


        )

      }


    </div>

  );

};


export default Apps;