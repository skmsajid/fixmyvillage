import { useState, useEffect } from "react";
import "../styles/villager.css";
import { useNavigate } from "react-router-dom";

export default function VillagerDashboard(){

const navigate = useNavigate();

const userName = localStorage.getItem("userName");
const userId = localStorage.getItem("userId");

/* USER INFO */

const [userInfo,setUserInfo] = useState({
email:"",
aadhar:""
});

/* ISSUE STATES */

const [assignedIssues,setAssignedIssues] = useState([]);
const [progressIssues,setProgressIssues] = useState([]);
const [resolvedIssues,setResolvedIssues] = useState([]);
const [myIssues,setMyIssues] = useState([]);

const [stats,setStats] = useState({
total:0,
assigned:0,
progress:0,
resolved:0
});

/* FORM */

const [activeForm,setActiveForm] = useState("");

const [formData,setFormData] = useState({
street:"",
pipeline:"",
pole:"",
houseNo:"",
description:"",
photo:null
});

const logout = ()=>{
localStorage.clear();
navigate("/");
};



/* FETCH USER INFO */

useEffect(()=>{

const fetchUserInfo = async()=>{

try{

const res = await fetch(`http://localhost:5000/api/auth/users/${userId}`);
const data = await res.json();

setUserInfo({
email:data.email,
aadhar:data.aadhar
});

}catch(err){
console.log(err);
}

};

if(userId) fetchUserInfo();

},[userId]);



/* FETCH ALL ISSUES */

useEffect(()=>{

const fetchIssues = async()=>{

const categories=["electricity","water","garbage","drainage"];

let assigned=[];
let progress=[];
let resolved=[];
let my=[];
let total=0;

for(const cat of categories){

const res = await fetch(`http://localhost:5000/api/issues/${cat}`);
const data = await res.json();

const issues=data.map(i=>({...i,category:cat}));

total+=issues.length;

assigned.push(...issues.filter(i=>i.status==="Assigned"));
progress.push(...issues.filter(i=>i.status==="In Progress"));
resolved.push(...issues.filter(i=>i.status==="Resolved"));
my.push(...issues.filter(i=>i.userId===userId));

}

setAssignedIssues(assigned);
setProgressIssues(progress);
setResolvedIssues(resolved);
setMyIssues(my);

setStats({
total,
assigned:assigned.length,
progress:progress.length,
resolved:resolved.length
});

};

fetchIssues();

},[userId]);



/* FORM HANDLERS */

const handleChange=(e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};

const handlePhoto=(e)=>{
setFormData({
...formData,
photo:e.target.files[0]
});
};

const resetForm=()=>{
setFormData({
street:"",
pipeline:"",
pole:"",
houseNo:"",
description:"",
photo:null
});
};



/* SUBMIT ISSUE */

const submitIssue=async()=>{

if(!activeForm) return alert("Select issue category");
if(!formData.street) return alert("Street required");
if(!formData.description) return alert("Description required");
if(!formData.photo) return alert("Upload photo");

const data=new FormData();

Object.keys(formData).forEach(key=>{
data.append(key,formData[key]);
});

data.append("userId",userId);
data.append("date",new Date().toLocaleDateString());
data.append("time",new Date().toLocaleTimeString());

try{

const res=await fetch(`http://localhost:5000/api/issues/${activeForm}`,{
method:"POST",
body:data
});

if(!res.ok) return alert("Submission failed");

alert("Issue submitted");

resetForm();
setActiveForm("");

}catch(err){
alert("Server error");
}

};



/* CATEGORY LABEL */

const label=(cat)=>{

if(cat==="electricity") return "⚡ Electricity";
if(cat==="water") return "💧 Water";
if(cat==="garbage") return "🗑 Garbage";
if(cat==="drainage") return "🚰 Drainage";

};



/* CAROUSEL COMPONENT */

const Carousel=({issues,title})=>{

if(issues.length===0){
return(
<div className="progress-section">
<h2>{title}</h2>
<p className="empty">No issues</p>
</div>
);
}

return(

<div className="progress-section">

<h2>{title}</h2>

<div className="carousel">

<div className={`carousel-track ${issues.length<3?"no-scroll":""}`}>

{issues.map(issue=>(

<div key={issue._id} className="issue-progress-card">

<div className="category-tag">
{label(issue.category)}
</div>

{issue.photoId && (
<img
src={`http://localhost:5000/api/files/${issue.photoId}`}
alt="issue"
/>
)}

<div className="issue-info">

<p><b>Street:</b> {issue.street}</p>

{issue.houseNo && (
<p><b>House:</b> {issue.houseNo}</p>
)}

<p className="desc">{issue.description}</p>

<p className="status">{issue.status}</p>

{issue.deadline && (
<p className="deadline">Deadline: {issue.deadline}</p>
)}

</div>

</div>

))}

</div>

</div>

</div>

);

};



return(

<div className="villager-container">

{/* HEADER */}

<div className="dashboard-header">

<h1>Villager Dashboard</h1>

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>



{/* USER INFO */}

<div className="user-box">

<div>

<h3>{userName}</h3>

<p><b>Aadhaar:</b> {userInfo.aadhar || "Loading..."}</p>
<p><b>Email:</b> {userInfo.email || "Loading..."}</p>

</div>

<div className="user-id">
User ID: {userId}
</div>

</div>



{/* STATISTICS */}

<div className="stats-grid">

<div className="stat-card">
<h3>Total Issues</h3>
<p>{stats.total}</p>
</div>

<div className="stat-card">
<h3>Assigned</h3>
<p>{stats.assigned}</p>
</div>

<div className="stat-card">
<h3>In Progress</h3>
<p>{stats.progress}</p>
</div>

<div className="stat-card">
<h3>Resolved</h3>
<p>{stats.resolved}</p>
</div>

</div>
<div><h2>Ongoing Works👇</h2></div>



{/* ASSIGNED ISSUES */}

<Carousel
title="🟡 Assigned Issues"
issues={assignedIssues}
/>



{/* IN PROGRESS ISSUES */}

<Carousel
title="🔵 In Progress Issues"
issues={progressIssues}
/>



{/* ISSUE CATEGORY CARDS */}
<div><h2>Rice a Complaint👇</h2></div>

<div className="issue-cards">

<div className="card" onClick={()=>setActiveForm("garbage")}>
🗑 Garbage Issue
</div>

<div className="card" onClick={()=>setActiveForm("water")}>
💧 Water Issue
</div>

<div className="card" onClick={()=>setActiveForm("electricity")}>
⚡ Electricity Issue
</div>

<div className="card" onClick={()=>setActiveForm("drainage")}>
🚰 Drainage Issue
</div>

</div>



{/* ISSUE REPORT FORM */}

{activeForm && (

<div className="report-box">

<h2>Report {label(activeForm)} Issue</h2>

<input
placeholder="Street"
name="street"
value={formData.street}
onChange={handleChange}
/>

{activeForm==="water" && (
<input
placeholder="Pipeline"
name="pipeline"
value={formData.pipeline}
onChange={handleChange}
/>
)}

{activeForm==="electricity" && (
<input
placeholder="Pole"
name="pole"
value={formData.pole}
onChange={handleChange}
/>
)}

<input
placeholder="House No"
name="houseNo"
value={formData.houseNo}
onChange={handleChange}
/>

<textarea
placeholder="Description"
name="description"
value={formData.description}
onChange={handleChange}
/>

<input
type="file"
accept="image/*"
onChange={handlePhoto}
/>

<button className="report-btn" onClick={submitIssue}>
Submit
</button>

</div>

)}



{/* MY ISSUES TABLE */}

<div className="my-issues">

<h2>My Issues</h2>

{myIssues.length===0?(
<p className="empty">No issues submitted.</p>
):( 

<table className="issue-table">

<thead>
<tr>
<th>Category</th>
<th>Street</th>
<th>Status</th>
<th>Date</th>
</tr>
</thead>

<tbody>

{myIssues.map(i=>(
<tr key={i._id}>
<td>{label(i.category)}</td>
<td>{i.street}</td>
<td>{i.status === "Rejected"
? `Rejected (${i.reason || "No reason"})`
: i.status}</td>
<td>{i.date}</td>
</tr>
))}

</tbody>

</table>

)}

</div>



{/* RESOLVED ISSUES */}

<Carousel
title="✅ Resolved Issues"
issues={resolvedIssues}
/>

</div>

);

}