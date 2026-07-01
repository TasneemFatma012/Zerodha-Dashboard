import React,{useState,useEffect,useRef} from "react";
import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;


const Menu =()=>{


const [profile,setProfile]=useState(null);

const [menuOpen,setMenuOpen]=useState(false);

const [profileOpen,setProfileOpen]=useState(false);


const navigate=useNavigate();


const menuRef=useRef();





// get profile

useEffect(()=>{


const id=localStorage.getItem("userId");


if(!id)return;


axios
.get(`${API}/users/profile?id=${id}`)
.then(res=>{

setProfile(res.data);

})
.catch(err=>console.log(err));


},[]);






// close outside

useEffect(()=>{


const close=(e)=>{

if(
menuRef.current &&
!menuRef.current.contains(e.target)
){

setMenuOpen(false);
setProfileOpen(false);

}

};


document.addEventListener(
"mousedown",
close
);


return()=>{

document.removeEventListener(
"mousedown",
close
)

}


},[]);







const logout=()=>{


localStorage.removeItem("userId");

setProfile(null);

navigate("/login");


};






return(


<nav 
className="menu-container"
ref={menuRef}
>




{/* Logo */}

<div className="logo-section">

<h3>
Nexora
</h3>

<span>
Trading
</span>

</div>







{/* Mobile button */}

<button

className="menu-toggle"

onClick={()=>setMenuOpen(!menuOpen)}

>

☰

</button>








<ul 
className={`menu-list ${menuOpen?"open":""}`}
>


<li>
<NavLink to="/" end>
Dashboard
</NavLink>
</li>


<li>
<NavLink to="/orders">
Orders
</NavLink>
</li>


<li>
<NavLink to="/holdings">
Holdings
</NavLink>
</li>


<li>
<NavLink to="/positions">
Positions
</NavLink>
</li>


<li>
<NavLink to="/funds">
Funds
</NavLink>
</li>


<li>
<NavLink to="/apps">
Apps
</NavLink>
</li>


</ul>









{/* RIGHT SIDE */}

<div className="nav-right">



{

profile ?


<div 
className="profile-card"
onClick={()=>setProfileOpen(!profileOpen)}
>



<div className="avatar">

{
profile.username
?.slice(0,2)
.toUpperCase()

}

</div>



<div className="profile-text">

<b>
{profile.username}
</b>


<small>
{profile.role}
</small>


</div>





{

profileOpen &&


<button
className="logout-btn"
onClick={logout}
>

Logout

</button>


}



</div>



:



<div className="auth-buttons">


<NavLink to="/login">

<button className="login-btn">
Login
</button>

</NavLink>


<NavLink to="/signup">

<button className="signup-btn">
Signup
</button>

</NavLink>


</div>



}



</div>



</nav>



)

}


export default Menu;