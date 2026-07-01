import React, {useEffect, useState} from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,

  PieChart,
  Pie,
  Cell,

  BarChart,
  Bar

} from "recharts";



const COLORS = [
"#00f5d4",
"#387ed1",
"#ff9f43",
"#ff4757"
];



const Analytics =()=>{


const [holdings,setHoldings] = useState([]);




useEffect(()=>{


const userId = localStorage.getItem("userId");


axios
.get(`${API}/holdings?userId=${userId}`)

.then((res)=>{


console.log("Analytics Holdings:",res.data);


setHoldings(res.data);


})

.catch(err=>console.log(err));


},[]);





// Calculations


const investment = holdings.reduce(

(sum,item)=>

sum + (item.avg * item.qty)

,0);



const currentValue = holdings.reduce(

(sum,item)=>

sum + (item.price * item.qty)

,0);



const profit = currentValue - investment;



const profitPercent = investment

?

((profit/investment)*100).toFixed(2)

:

0;




// Pie Data


const sectorData = holdings.map(item=>({

name:item.name,

value:item.price * item.qty

}));





// Bar Data


const profitData = holdings.map(item=>({

name:item.name,


profit:

(item.price-item.avg)

*

item.qty,


percent:

(((item.price-item.avg)/item.avg)*100).toFixed(2)


}));





return(


<div className="analytics-container">



<h1>
Portfolio Analytics
</h1>




<div className="analytics-cards">



<div className="analytics-card portfolio-card">


<div className="card-icon">
💰
</div>


<div>

<p>Total Portfolio</p>


<h2>

₹{currentValue.toFixed(2)}

</h2>


<span>
Current Value
</span>


</div>


</div>






<div className="analytics-card profit-card">


<div className="card-icon">
📈
</div>


<div>

<p>Total Profit</p>


<h2>

₹{profit.toFixed(2)}

</h2>


<span>

{profitPercent}% Return

</span>


</div>


</div>







<div className="analytics-card">


<div className="card-icon">
🎯
</div>


<div>

<p>Total Holdings</p>


<h2>

{holdings.length}

</h2>


<span>
Stocks
</span>


</div>


</div>







<div className="analytics-card">


<div className="card-icon">
📊
</div>


<div>

<p>Total Investment</p>


<h2>

₹{investment.toFixed(2)}

</h2>


<span>
Invested Amount
</span>


</div>


</div>



</div>









{/* Pie Chart */}



<div className="analytics-chart">


<h3>
Portfolio Allocation
</h3>


<ResponsiveContainer
width="100%"
height={300}
>


<PieChart>


<Pie

data={sectorData}

dataKey="value"

nameKey="name"

outerRadius={100}

label

>


{

sectorData.map((item,index)=>(


<Cell

key={index}

fill={COLORS[index % COLORS.length]}


/>


))

}


</Pie>



<Tooltip/>


</PieChart>


</ResponsiveContainer>



</div>









{/* Bar Chart */}


<div className="analytics-chart">


<h3>
Stock Wise Profit & Loss
</h3>


<ResponsiveContainer

width="100%"

height={350}

>


<BarChart

data={profitData}

>


<XAxis

dataKey="name"

/>



<YAxis/>


<Tooltip/>




<Bar

dataKey="profit"

radius={[10,10,0,0]}

>


{

profitData.map((item,index)=>(


<Cell

key={index}

fill={

item.profit >=0

?

"#00f5d4"

:

"#ff4757"

}


/>


))

}



</Bar>



</BarChart>


</ResponsiveContainer>



</div>







{/* Gainers Losers */}



<div className="stock-analysis">



<div className="stock-box gain-box">


<h3>
🚀 Top Gainers
</h3>



{

profitData

.filter(item=>item.profit>0)

.map((item,index)=>(


<div className="stock-row" key={index}>


<span>

{item.name}

</span>


<strong className="gain-text">


+{item.percent}%

</strong>


</div>


))

}



</div>








<div className="stock-box loss-box">


<h3>
📉 Top Losers
</h3>



{

profitData

.filter(item=>item.profit<0)

.map((item,index)=>(


<div className="stock-row" key={index}>


<span>

{item.name}

</span>


<strong className="loss-text">

{item.percent}%
</strong>


</div>


))

}



</div>



</div>





</div>



)


}



export default Analytics;