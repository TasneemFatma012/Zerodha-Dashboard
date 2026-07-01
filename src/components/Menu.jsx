import React,{useState,useEffect,useRef} from "react";
import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;


const Menu =()=>{


const [profile,setProfile]=useState(null);

const [menuOpen,setMenuOpen]=useState(false);

const [profileOpen,setProfileOpen]=useState(false);


const navigate = useNavigate();

const menuRef = useRef();





// Get Profile

useEffect(()=>{


const id = localStorage.getItem("userId");


if(!id) return;



axios
.get(`${API}/users/profile?id=${id}`)
.then((res)=>{

setProfile(res.data);

})
.catch((err)=>{

console.log(err);

});


},[]);







// Outside Click


useEffect(()=>{


const handleClick=(e)=>{


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
handleClick
);



return()=>{

document.removeEventListener(
"mousedown",
handleClick
);

}



},[]);







// Logout


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






{/* LOGO */}


<div className="logo-section">


<h3>
Nexora
</h3>


<span>
Trading
</span>


</div>









{/* MENU LINKS */}



<ul 
className={`menu-list ${menuOpen ? "open":""}`}
>



<li>

<NavLink 
to="/"
end
onClick={()=>setMenuOpen(false)}
>

Dashboard

</NavLink>

</li>




<li>

<NavLink 
to="/orders"
onClick={()=>setMenuOpen(false)}
>

Orders

</NavLink>

</li>





<li>

<NavLink 
to="/holdings"
onClick={()=>setMenuOpen(false)}
>

Holdings

</NavLink>

</li>





<li>

<NavLink 
to="/positions"
onClick={()=>setMenuOpen(false)}
>

Positions

</NavLink>

</li>





<li>

<NavLink 
to="/funds"
onClick={()=>setMenuOpen(false)}
>

Funds

</NavLink>

</li>





<li>

<NavLink 
to="/apps"
onClick={()=>setMenuOpen(false)}
>

Apps

</NavLink>

</li>




</ul>









{/* RIGHT SECTION */}


<div className="nav-right">





{

profile ? (



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



</div>









{/* MOBILE TOGGLE */}



<button

className="menu-toggle"

onClick={()=>setMenuOpen(!menuOpen)}

>

☰

</button>







</nav>


);


};



export default Menu;