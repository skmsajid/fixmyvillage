import { useState, useEffect } from "react";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard(){

const navigate = useNavigate();

const adminName = "Admin";

const logout = ()=>{
localStorage.clear();
navigate("/");
};

const [requests,setRequests] = useState([]);
const [activeCategory,setActiveCategory] = useState("");

const [issues,setIssues] = useState({
electricity:[],
water:[],
garbage:[],
drainage:[]
});

/* ========================
FETCH SIGNUP REQUESTS
======================== */

useEffect(()=>{

fetch("http://localhost:5000/api/admin/requests")
.then(res=>res.json())
.then(data=>setRequests(data))
.catch(err=>console.log(err));

},[]);

/* ========================
FETCH ISSUES
======================== */

useEffect(()=>{

fetch("http://localhost:5000/api/issues/electricity")
.then(res=>res.json())
.then(data=>setIssues(prev=>({...prev,electricity:data})));

fetch("http://localhost:5000/api/issues/water")
.then(res=>res.json())
.then(data=>setIssues(prev=>({...prev,water:data})));

fetch("http://localhost:5000/api/issues/garbage")
.then(res=>res.json())
.then(data=>setIssues(prev=>({...prev,garbage:data})));

fetch("http://localhost:5000/api/issues/drainage")
.then(res=>res.json())
.then(data=>setIssues(prev=>({...prev,drainage:data})));

},[]);

/* ========================
APPROVE USER
======================== */

const approveUser = async(id)=>{

await fetch(`http://localhost:5000/api/admin/approve/${id}`,{
method:"PUT"
});

setRequests(requests.filter(u=>u._id!==id));

};

/* ========================
REJECT USER
======================== */

const rejectUser = async(id)=>{

await fetch(`http://localhost:5000/api/admin/reject/${id}`,{
method:"PUT"
});

setRequests(requests.filter(u=>u._id!==id));

};

/* ========================
ISSUE LIST
======================== */

const renderIssues = ()=>{

const list = issues[activeCategory] || [];

if(list.length===0){
return <p className="no-issues">No problems reported.</p>
}

return(

<div className="issue-grid">

{list.map(issue=>(

<div key={issue._id} className="issue-card">

{/* LEFT DETAILS */}

<div className="issue-left">

<h3 className="issue-title">{activeCategory.toUpperCase()} ISSUE</h3>

<p><b>Raised By:</b> {issue.villagerName || "Unknown"}</p>
<p><b>Aadhaar:</b> {issue.aadhar || "N/A"}</p>

{/* GARBAGE */}

{activeCategory==="garbage" && (
<>

<p><b>Street:</b> {issue.street}</p>
<p><b>Description:</b> {issue.description}</p>
</>
)}

{/* WATER */}

{activeCategory==="water" && (
<>

<p><b>Street:</b> {issue.street}</p>
<p><b>Pipeline:</b> {issue.pipeline}</p>
<p><b>House No:</b> {issue.houseNo}</p>
<p><b>Description:</b> {issue.description}</p>
</>
)}

{/* ELECTRICITY */}

{activeCategory==="electricity" && (
<>

<p><b>Street:</b> {issue.street}</p>
<p><b>Pole:</b> {issue.pole}</p>
<p><b>House No:</b> {issue.houseNo}</p>
<p><b>Description:</b> {issue.description}</p>
</>
)}

{/* DRAINAGE */}

{activeCategory==="drainage" && (
<>

<p><b>Street:</b> {issue.street}</p>
<p><b>House No:</b> {issue.houseNo}</p>
<p><b>Description:</b> {issue.description}</p>
</>
)}

<p><b>Status:</b> {issue.status}</p>
<p><b>Date:</b> {issue.date}</p>
<p><b>Time:</b> {issue.time}</p>

</div>

{/* RIGHT IMAGE */}

{issue.photoId && (

<div className="issue-right">

<img
src={`http://localhost:5000/api/files/${issue.photoId}`}
alt="issue"
/>

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

<span>Hi {adminName}</span>

<button onClick={logout} className="logout-btn">
Logout
</button>

</div>

</div>

{/* SIGNUP REQUESTS */}

<div className="request-section">

<h3>Villager Registration Requests</h3>

{requests.length===0 ?

<p className="no-issues">No Requests</p>

:

<table className="admin-table">

<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Aadhaar</th>
<th>Approve</th>
<th>Reject</th>
</tr>
</thead>

<tbody>

{requests.map(user=>(

<tr key={user._id}>

<td>{user.name}</td>
<td>{user.email}</td>
<td>{user.aadhar}</td>

<td>
<button
className="approve-btn"
onClick={()=>approveUser(user._id)}
>
Approve
</button>
</td>

<td>
<button
className="reject-btn"
onClick={()=>rejectUser(user._id)}
>
Reject
</button>
</td>

</tr>

))}

</tbody>

</table>

}

</div>

{/* CATEGORY CARDS */}

<div className="category-cards">

<div className="category-card" onClick={()=>setActiveCategory("electricity")}>
⚡ Electricity
</div>

<div className="category-card" onClick={()=>setActiveCategory("water")}>
💧 Water
</div>

<div className="category-card" onClick={()=>setActiveCategory("garbage")}>
🗑 Garbage
</div>

<div className="category-card" onClick={()=>setActiveCategory("drainage")}>
🚰 Drainage
</div>

</div>

{/* ISSUE LIST */}

<div className="issue-section">

{activeCategory && renderIssues()}

</div>

</div>

)

}
