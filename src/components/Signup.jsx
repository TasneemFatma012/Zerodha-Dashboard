import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;


const Signup =()=>{


const navigate = useNavigate();


const [data,setData] = useState({

fullName:"",
email:"",
phone:"",
pan:"",
dob:"",
password:""

});



const handleSignup = async()=>{


try{


const res = await axios.post(
`${API}/users/signup`,
data
);


alert("Signup successful");


navigate("/login");


}
catch(err){

console.log(err);

alert(
err.response?.data?.message ||
"Signup failed"
);

}


};



return(


<div className="signup-container">


<div className="signup-card">


<h2 className="signup-title">
Create Account
</h2>


<p className="signup-subtitle">
Join Nexora Trading Platform
</p>



<input

className="signup-input"

placeholder="Full Name"

onChange={(e)=>
setData({...data,fullName:e.target.value})
}

/>



<input

className="signup-input"

placeholder="Email"

type="email"

onChange={(e)=>
setData({...data,email:e.target.value})
}

/>



<input

className="signup-input"

placeholder="Phone"

onChange={(e)=>
setData({...data,phone:e.target.value})
}

/>



<input

className="signup-input"

placeholder="PAN Number"

onChange={(e)=>
setData({...data,pan:e.target.value})
}

/>



<input

className="signup-input"

placeholder="Date of Birth"

onChange={(e)=>
setData({...data,dob:e.target.value})
}

/>



<input

className="signup-input"

placeholder="Password"

type="password"

onChange={(e)=>
setData({...data,password:e.target.value})
}

/>




<button

className="signup-submit"

onClick={handleSignup}

>

Create Account

</button>



</div>


</div>


)

}


export default Signup;