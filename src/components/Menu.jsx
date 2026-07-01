import React,{useState,useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;


const Menu = () => {


const [profile,setProfile] = useState(null);

const navigate = useNavigate();



const [isProfileOpen,setIsProfileOpen] = useState(false);



const handleProfileClick = () => {

setIsProfileOpen(!isProfileOpen);

};



// Get Profile

useEffect(()=>{


const id = localStorage.getItem("userId");


if(!id){
  return;
}



axios
.get(`${API}/users/profile?id=${id}`)
.then((res)=>{

setProfile(res.data);

})
.catch((err)=>{

console.log(err);

});


},[]);



// Logout

const handleLogout = ()=>{

localStorage.removeItem("userId");

setProfile(null);

navigate("/login");

};



return (


<nav className="menu-container">



<div className="logo-section">

<h3>Nexora</h3>

</div>





<ul className="menu-list">


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





{/* Profile Section */}


{
profile ? (


<div 
className="profile-card"
onClick={handleProfileClick}
>



<div className="avatar">

{
profile?.username
?.slice(0,2)
.toUpperCase()

}

</div>



<div>

<p className="username">

{profile?.username}

</p>


<span className="role">

{profile?.role}

</span>


</div>



{
isProfileOpen &&

<button onClick={handleLogout}
className="logout-btn"

>

Logout

</button>

}


</div>



)

:

(

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

)

}





</nav>


);


};


export default Menu;