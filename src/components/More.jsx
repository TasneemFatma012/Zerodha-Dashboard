import React,{useEffect,useState} from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;


const More =()=>{


const [profile,setProfile]=useState(null);

const [holdings,setHoldings]=useState([]);




useEffect(()=>{


const userId = localStorage.getItem("userId");


// Profile

axios
.get(`${API}/users/profile?id=${userId}`)
.then(res=>{

setProfile(res.data);

});




// Holdings

axios
.get(`${API}/holdings?userId=${userId}`)
.then(res=>{

setHoldings(res.data);

});


},[]);





const investment = holdings.reduce(

(sum,item)=>

sum + item.avg * item.qty

,0);



const currentValue = holdings.reduce(

(sum,item)=>

sum + item.price * item.qty

,0);



const profit = currentValue-investment;



return(


<div className="more-container">


<h1>
Investor Center
</h1>




{/* Profile Summary */}



<div className="investor-summary">



<div className="big-avatar">

{profile?.username?.slice(0,2).toUpperCase()}

</div>



<div>


<h2>

{profile?.username}

</h2>


<p>

{profile?.role}

</p>



</div>




<div className="summary-box">


<span>
Portfolio Value
</span>


<h2>

₹{currentValue}

</h2>


</div>






<div className="summary-box">


<span>
Today's P&L
</span>


<h2 className={profit>=0?"profit":"loss"}>

₹{profit}

</h2>


</div>



</div>







{/* Trading Stats */}


<div className="stats-section">



<div className="more-stat">

<h3>
{holdings.length}
</h3>

<p>
Total Holdings
</p>

</div>



<div className="more-stat">

<h3>
78%
</h3>

<p>
Win Rate
</p>

</div>




<div className="more-stat">

<h3>
45
</h3>

<p>
Total Trades
</p>

</div>




</div>







{/* Actions */}



<div className="more-grid">



<div className="more-card">

<h2>
💰 Funds
</h2>

<p>
Manage money & withdrawal
</p>

<button>
Open
</button>

</div>





<div className="more-card">


<h2>
📜 Orders
</h2>


<p>
Check previous trades
</p>


<button>
View
</button>


</div>





<div className="more-card">


<h2>
🔐 Security
</h2>


<p>
Password & account safety
</p>


<button>
Manage
</button>


</div>







<div className="more-card">


<h2>
⚙ Settings
</h2>


<p>
Customize application
</p>


<button>
Open
</button>


</div>



</div>



</div>


)

}



export default More;