import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;


const AppDetail = () => {


const {id}=useParams();

const navigate=useNavigate();


const [app,setApp]=useState(null);

const [loading,setLoading]=useState(true);



useEffect(()=>{

axios
.get(`${API}/apps/${id}`)
.then((res)=>{

setApp(res.data);

})
.catch(err=>console.log(err))
.finally(()=>setLoading(false));


},[]);



if(loading)
return <h2>Loading...</h2>



return(


<div className="app-detail">



<button 
className="back-btn"
onClick={()=>navigate("/apps")}
>
← Back
</button>




<div 
className="app-detail-icon"
style={{
background:app.color
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



<div className="app-info">


<div>
<h4>Category</h4>
<p>{app.category || "Trading"}</p>
</div>



<div>
<h4>Rating</h4>
<p>⭐ {app.rating || "4.5"}</p>
</div>



<div>
<h4>Version</h4>
<p>{app.version || "1.0"}</p>
</div>


</div>





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

className="open-btn"

onClick={()=>navigate(app.path)}

>

Open App

</button>



</div>


)


}


export default AppDetail;