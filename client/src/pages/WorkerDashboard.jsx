import { useState, useEffect } from "react";
import "../styles/worker.css";
import { useNavigate } from "react-router-dom";

export default function WorkerDashboard(){

const navigate = useNavigate();

const logout = ()=>{
localStorage.clear();
navigate("/");
};

const [activeCategory,setActiveCategory] = useState("");

const [tasks,setTasks] = useState({
electricity:[],
water:[],
garbage:[],
drainage:[]
});

/* FETCH TASKS */

useEffect(()=>{

fetch("http://localhost:5000/api/issues/electricity")
.then(res=>res.json())
.then(data=>setTasks(prev=>({...prev,electricity:data})));

fetch("http://localhost:5000/api/issues/water")
.then(res=>res.json())
.then(data=>setTasks(prev=>({...prev,water:data})));

fetch("http://localhost:5000/api/issues/garbage")
.then(res=>res.json())
.then(data=>setTasks(prev=>({...prev,garbage:data})));

fetch("http://localhost:5000/api/issues/drainage")
.then(res=>res.json())
.then(data=>setTasks(prev=>({...prev,drainage:data})));

},[]);

/* UPDATE STATUS */

const updateStatus = async(id,status)=>{

await fetch(`http://localhost:5000/api/issues/status/${activeCategory}/${id}`,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({status})
});

setTasks(prev=>({

...prev,

[activeCategory]: prev[activeCategory].map(task =>
task._id === id ? {...task,status} : task
)

}));

};

/* RESOLVE ISSUE */

const resolveIssue = async(id)=>{

const confirm = window.confirm("Are you sure the issue is resolved?");

if(!confirm) return;

await updateStatus(id,"Resolved");

};

/* TASK LIST */

const renderTasks = ()=>{

const list = (tasks[activeCategory] || []).filter(
task => task.status === "Assigned" || task.status === "In Progress"
);

if(list.length===0){
return <p className="no-tasks">No assigned tasks.</p>
}

return(

<div className="task-grid">

{list.map(task=>(

<div key={task._id} className="task-card">

<h3>{activeCategory.toUpperCase()} TASK</h3>

<p><b>Street:</b> {task.street}</p>

{activeCategory==="water" && <p><b>Pipeline:</b> {task.pipeline}</p>}
{activeCategory==="electricity" && <p><b>Pole:</b> {task.pole}</p>}

<p><b>House No:</b> {task.houseNo}</p>

<p><b>Description:</b> {task.description}</p>

<p><b>Status:</b> {task.status}</p>

<div className="task-actions">

{task.status === "Assigned" && (

<button
className="progress-btn"
onClick={()=>updateStatus(task._id,"In Progress")}

>

Start Work </button>

)}

{task.status === "In Progress" && (

<button
className="complete-btn"
onClick={()=>resolveIssue(task._id)}

>

Mark Resolved </button>

)}

</div>

</div>

))}

</div>

)

};

return(

<div className="worker-container">

<div className="worker-navbar">

<h2>Worker Dashboard</h2>

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>

{/* CATEGORY CARDS */}

<div className="worker-cards">

<div
className="worker-card"
onClick={()=>setActiveCategory("electricity")}
>
⚡ Electricity
</div>

<div
className="worker-card"
onClick={()=>setActiveCategory("water")}
>
💧 Water
</div>

<div
className="worker-card"
onClick={()=>setActiveCategory("garbage")}
>
🗑 Garbage
</div>

<div
className="worker-card"
onClick={()=>setActiveCategory("drainage")}
>
🚰 Drainage
</div>

</div>

{/* TASKS */}

<div className="task-section">

{activeCategory && renderTasks()}

</div>

</div>

);

}
