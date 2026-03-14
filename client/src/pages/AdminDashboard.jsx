import { useState, useEffect } from "react";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
PieChart,
Pie,
Cell,
ResponsiveContainer,
Legend
} from "recharts";

export default function AdminDashboard(){

const navigate = useNavigate();
const adminName="Admin";

const logout=()=>{
localStorage.clear();
navigate("/");
};

const [requests,setRequests]=useState([]);
const [showRequestPopup,setShowRequestPopup]=useState(false);

const [activeCategory,setActiveCategory]=useState("");

const [issues,setIssues]=useState({
electricity:[],
water:[],
garbage:[],
drainage:[]
});

const [assignedIssues,setAssignedIssues]=useState([]);
const [progressIssues,setProgressIssues]=useState([]);
const [overdueIssues,setOverdueIssues]=useState([]);

const [stats,setStats]=useState({
total:0,
pending:0,
assigned:0,
progress:0,
resolved:0,
rejected:0
});

const [rejectReason,setRejectReason]=useState({});
const [deadline,setDeadline]=useState({});


/* CATEGORY LABEL */

const label=(cat)=>{
if(cat==="electricity") return "⚡ Electricity";
if(cat==="water") return "💧 Water";
if(cat==="garbage") return "🗑 Garbage";
if(cat==="drainage") return "🚰 Drainage";
};


/* FETCH SIGNUP REQUESTS */

useEffect(()=>{
fetch("http://localhost:5000/api/admin/requests")
.then(res=>res.json())
.then(data=>setRequests(data));
},[]);


/* APPROVE USER */

const approveUser=async(id)=>{

await fetch(`http://localhost:5000/api/admin/approve/${id}`,{
method:"PUT"
});

setRequests(requests.filter(u=>u._id!==id));

};


/* REJECT USER */

const rejectUser=async(id)=>{

await fetch(`http://localhost:5000/api/admin/reject/${id}`,{
method:"PUT"
});

setRequests(requests.filter(u=>u._id!==id));

};



/* FETCH ALL ISSUES */

const fetchAllIssues=async()=>{

const categories=["electricity","water","garbage","drainage"];

let assigned=[];
let progress=[];
let overdue=[];

let total=0;
let pending=0;
let resolved=0;
let rejected=0;

for(const cat of categories){

const res=await fetch(`http://localhost:5000/api/issues/${cat}`);
const data=await res.json();

const withCategory=data.map(i=>({...i,category:cat}));

total+=withCategory.length;

pending+=withCategory.filter(i=>i.status==="Pending").length;
resolved+=withCategory.filter(i=>i.status==="Resolved").length;
rejected+=withCategory.filter(i=>i.status==="Rejected").length;

assigned.push(...withCategory.filter(i=>i.status==="Assigned"));
progress.push(...withCategory.filter(i=>i.status==="In Progress"));

const today=new Date();

overdue.push(...withCategory.filter(i=>{
if(!i.deadline) return false;
return new Date(i.deadline)<=today && i.status!=="Resolved";
}));

}

setAssignedIssues(assigned);
setProgressIssues(progress);
setOverdueIssues(overdue);

setStats({
total,
pending,
assigned:assigned.length,
progress:progress.length,
resolved,
rejected
});

};

useEffect(()=>{
fetchAllIssues();
},[]);



/* FETCH CATEGORY ISSUES */

const fetchIssues=async(category)=>{

const res=await fetch(`http://localhost:5000/api/issues/${category}`);
const data=await res.json();

setIssues(prev=>({
...prev,
[category]:data
}));

};



/* ACCEPT ISSUE */

const acceptIssue=async(id)=>{

if(!deadline[id]){
alert("Select deadline");
return;
}

await fetch(`http://localhost:5000/api/issues/status/${activeCategory}/${id}`,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
status:"Assigned",
deadline:deadline[id]
})
});

fetchIssues(activeCategory);
fetchAllIssues();

};



/* REJECT ISSUE */

const rejectIssue=async(id)=>{

if(!rejectReason[id]){
alert("Select rejection reason");
return;
}

await fetch(`http://localhost:5000/api/issues/status/${activeCategory}/${id}`,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
status:"Rejected",
reason:rejectReason[id]
})
});

fetchIssues(activeCategory);
fetchAllIssues();

};



/* CHART DATA */

const chartData=[
{name:"Pending",value:stats.pending},
{name:"Assigned",value:stats.assigned},
{name:"Progress",value:stats.progress},
{name:"Resolved",value:stats.resolved},
{name:"Rejected",value:stats.rejected}
];

const COLORS=["#f59e0b","#3b82f6","#6366f1","#22c55e","#ef4444"];



/* ISSUE CARD */

const IssueCard=({issue})=>(

<div className="issue-progress-card">

<div className="category-tag">
{label(issue.category)}
</div>

{issue.photoId &&(
<img src={`http://localhost:5000/api/files/${issue.photoId}`} alt="issue"/>
)}

<div className="issue-info">

<p><b>Street:</b> {issue.street}</p>

{issue.houseNo &&(
<p><b>House:</b> {issue.houseNo}</p>
)}

<p className="desc">{issue.description}</p>

<p className="status">{issue.status}</p>

{issue.deadline &&(
<p className="deadline">Deadline: {issue.deadline}</p>
)}

</div>

</div>

);



/* CAROUSEL */

const Carousel=({issues,title})=>{

if(issues.length===0){
return(
<div className="progress-section">
<h2>{title}</h2>
<p className="no-issues">No issues</p>
</div>
);
}

return(

<div className="progress-section">

<h2>{title}</h2>

<div className="carousel">

<div className="carousel-track">

{issues.map(issue=>(
<IssueCard key={issue._id} issue={issue}/>
))}

</div>

</div>

</div>

);

};



/* CATEGORY ISSUE LIST */

const renderIssues=()=>{

const list=(issues[activeCategory]||[]).filter(
issue=>issue.status==="Pending"
);

if(list.length===0){
return <p className="no-issues">No pending issues.</p>
}

return(

<div className="issue-grid">

{list.map(issue=>(

<div
 key={issue._id}
 className="issue-card"
>

<div className="issue-left">

<h3 className="issue-title">{label(activeCategory)} Issue</h3>

<p><b>Raised By:</b> {issue.villagerName}</p>
<p><b>Aadhaar:</b> {issue.aadhar}</p>

<p><b>Street:</b> {issue.street}</p>

{activeCategory==="water" && (
<p><b>Pipeline:</b> {issue.pipeline}</p>
)}

{activeCategory==="electricity" && (
<p><b>Pole:</b> {issue.pole}</p>
)}

{activeCategory!=="garbage" && (
<p><b>House No:</b> {issue.houseNo}</p>
)}

<p><b>Description:</b> {issue.description}</p>

<p><b>Date:</b> {issue.date}</p>
<p><b>Time:</b> {issue.time}</p>

<input
 type="date"
 min={new Date().toISOString().split("T")[0]}
 value={deadline[issue._id]||""}
 onChange={(e)=>{
 e.stopPropagation();
 setDeadline({
 ...deadline,
 [issue._id]:e.target.value
 });
 }}
/>

<div className="issue-actions">

<button
 className="approve-btn"
 onClick={(e)=>{e.stopPropagation(); acceptIssue(issue._id);}}
>
Accept
</button>

<select
 value={rejectReason[issue._id]||""}
 onChange={(e)=>{
 e.stopPropagation();
 setRejectReason({
 ...rejectReason,
 [issue._id]:e.target.value
 });
 }}
>

<option value="">Reason</option>
<option>Duplicate issue</option>
<option>Wrong category</option>
<option>Fake complaint</option>
<option>Already fixed</option>

</select>

<button
 className="reject-btn"
 onClick={(e)=>{e.stopPropagation(); rejectIssue(issue._id);}}
>
Reject
</button>

</div>

</div>

{issue.photoId &&(

<div className="issue-right">
<img src={`http://localhost:5000/api/files/${issue.photoId}`} alt="issue"/>
</div>

)}

</div>

))}

</div>

)

};



return(

<div className="admin-container">

{/* NAVBAR */}

<div className="admin-navbar">

<h2>Admin Dashboard</h2>

<div className="admin-right">

{/* SIGNUP REQUEST BUTTON */}

<div className="request-button" onClick={()=>setShowRequestPopup(true)}>
Signup Requests
{requests.length>0 && <span className="notification-dot"></span>}
</div>

<span>Hi {adminName}</span>

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>

</div>


{/* REQUEST POPUP */}

{showRequestPopup &&(

<div className="popup-overlay">

<div className="popup-box">

<h2>Signup Requests</h2>

{requests.length===0 ? (

<>
<p>No signup requests.</p>
</>

):( 

requests.map(user=>(

<div key={user._id} className="request-card">

<p><b>Name:</b> {user.name}</p>
<p><b>Email:</b> {user.email}</p>
<p><b>Aadhaar:</b> {user.aadhar}</p>

<div className="request-actions">

<button
className="approve-btn"
onClick={()=>approveUser(user._id)}
>
Approve
</button>

<button
className="reject-btn"
onClick={()=>rejectUser(user._id)}
>
Reject
</button>

</div>

</div>

))

)}

<button className="close-popup" onClick={()=>setShowRequestPopup(false)}>
Close
</button>

</div>

</div>

)}


{/* DASHBOARD STATISTICS */}

<div className="stats-section">

<h2>Dashboard Statistics</h2>

<div className="stats-cards">

<div className="stat-card">Total<br/>{stats.total}</div>
<div className="stat-card pending">Pending<br/>{stats.pending}</div>
<div className="stat-card assigned">Assigned<br/>{stats.assigned}</div>
<div className="stat-card progress">Progress<br/>{stats.progress}</div>
<div className="stat-card resolved">Resolved<br/>{stats.resolved}</div>
<div className="stat-card rejected">Rejected<br/>{stats.rejected}</div>

</div>

<div className="charts">

<div className="chart-box">

<h3>Status Distribution</h3>

<ResponsiveContainer width="100%" height={250}>
<PieChart>
<Pie data={chartData} dataKey="value" outerRadius={80}>
{chartData.map((entry,index)=>(
<Cell key={index} fill={COLORS[index]}/>
))}
</Pie>
<Tooltip/>
<Legend/>
</PieChart>
</ResponsiveContainer>

</div>

<div className="chart-box">

<h3>Status Comparison</h3>

<ResponsiveContainer width="100%" height={250}>
<BarChart data={chartData}>
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="value" fill="#2563eb"/>
</BarChart>
</ResponsiveContainer>

</div>

</div>

</div>


{/* OVERDUE ISSUES */}

{overdueIssues.length>0 && (

<div className="overdue-section">

<h2>⚠ Overdue Tasks</h2>

<ul>

{overdueIssues.map(i=>(
<li key={i._id}>
{i.street} - deadline {i.deadline}
</li>
))}

</ul>

</div>

)}


{/* ASSIGNED */}

<Carousel title="Assigned Issues" issues={assignedIssues}/>


{/* IN PROGRESS */}

<Carousel title="In Progress Issues" issues={progressIssues}/>


{/* CATEGORY CARDS */}

<div className="category-cards">

<div className="category-card"
onClick={()=>{setActiveCategory("electricity");fetchIssues("electricity")}}>
⚡ Electricity
</div>

<div className="category-card"
onClick={()=>{setActiveCategory("water");fetchIssues("water")}}>
💧 Water
</div>

<div className="category-card"
onClick={()=>{setActiveCategory("garbage");fetchIssues("garbage")}}>
🗑 Garbage
</div>

<div className="category-card"
onClick={()=>{setActiveCategory("drainage");fetchIssues("drainage")}}>
🚰 Drainage
</div>

</div>


{/* CATEGORY ISSUES */}

<div className="issue-section">
{activeCategory && renderIssues()}
</div>

</div>

);

}