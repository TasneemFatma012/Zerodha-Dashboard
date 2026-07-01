import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;


const Login = () => {


const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();



const handleLogin = async()=>{


try{


const res = await axios.post(
`${API}/users/login`,
{
email,
password
}
);



localStorage.setItem(
"userId",
res.data.userId
);



alert("Login successful");

navigate("/");


}
catch(err){


console.log(err.response?.data);


alert(
    err.response?.data?.message || 
    "Invalid email or password");

}


};



return (


<div className="login-container">


<div className="login-card">


<h2 className="login-title">
Welcome Back
</h2>


<p className="login-subtitle">
Login to your Nexora account
</p>



<input

className="login-input"

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<input

className="login-input"

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



<button

className="login-btn"

onClick={handleLogin}

>

Login

</button>



</div>


</div>


)

}


export default Login;