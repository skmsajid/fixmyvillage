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

const [rejectReason,setRejectReason] = useState({});

/* FETCH SIGNUP REQUESTS */

useEffect(()=>{

fetch("http://localhost:5000/api/admin/requests")
.then(res=>res.json())
.then(data=>setRequests(data))
.catch(err=>console.log(err));

},[]);

/* FETCH ISSUES */

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

/* APPROVE USER */

const approveUser = async(id)=>{

await fetch(`http://localhost:5000/api/admin/approve/${id}`,{
method:"PUT"
});

setRequests(requests.filter(user => user._id !== id));

};

/* REJECT USER */

const rejectUser = async(id)=>{

await fetch(`http://localhost:5000/api/admin/reject/${id}`,{
method:"PUT"
});

setRequests(requests.filter(user => user._id !== id));

};

/* ACCEPT ISSUE */

const acceptIssue = async(id)=>{

await fetch(`http://localhost:5000/api/issues/status/${activeCategory}/${id}`,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({status:"Assigned"})
});

setIssues(prev=>({
...prev,
[activeCategory]: prev[activeCategory].filter(issue => issue._id !== id)
}));

};

/* REJECT ISSUE */

const rejectIssue = async(id)=>{

if(!rejectReason[id]){
alert("Please select rejection reason");
return;
}

await fetch(`http://localhost:5000/api/issues/status/${activeCategory}/${id}`,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
status:"Rejected",
reason: rejectReason[id]
})
});

setIssues(prev=>({
...prev,
[activeCategory]: prev[activeCategory].filter(issue => issue._id !== id)
}));

};

/* ISSUE LIST */

const renderIssues = ()=>{

const list = (issues[activeCategory] || []).filter(
issue => issue.status === "Pending"
);

if(list.length === 0){
return <p className="no-issues">No pending issues.</p>
}

return(

<div className="issue-grid">

{list.map(issue=>(

<div key={issue._id} className="issue-card">

<div className="issue-left">

<h3 className="issue-title">{activeCategory.toUpperCase()} ISSUE</h3>

<p><b>Raised By:</b> {issue.villagerName}</p>
<p><b>Aadhaar:</b> {issue.aadhar}</p>

<p><b>Street:</b> {issue.street}</p>

{activeCategory==="water" && (

<p><b>Pipeline:</b> {issue.pipeline}</p>
)}

{activeCategory==="electricity" && (

<p><b>Pole:</b> {issue.pole}</p>
)}

<p><b>House No:</b> {issue.houseNo}</p>

<p><b>Description:</b> {issue.description}</p>

<p><b>Date:</b> {issue.date}</p>
<p><b>Time:</b> {issue.time}</p>

{/* ADMIN ACTIONS */}

<div className="issue-actions">

<button
className="approve-btn"
onClick={()=>acceptIssue(issue._id)}

>

Accept </button>

<select
value={rejectReason[issue._id] || ""}
onChange={(e)=>setRejectReason({
...rejectReason,
[issue._id]: e.target.value
})}

>

<option value="">Select reason</option>
<option value="Duplicate issue">Duplicate issue</option>
<option value="Wrong category">Wrong category</option>
<option value="Fake complaint">Fake complaint</option>
<option value="Already fixed">Already fixed</option>

</select>

<button
className="reject-btn"
onClick={()=>rejectIssue(issue._id)}

>

Reject </button>

</div>

</div>

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

<button
className="logout-btn"
onClick={logout}

>

Logout </button>

</div>

</div>

{/* SIGNUP REQUESTS */}

<div className="request-section">

<h3>Villager Registration Requests</h3>

{requests.length === 0 ?

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

<div
className="category-card"
onClick={()=>setActiveCategory("electricity")}
>
⚡ Electricity
</div>

<div
className="category-card"
onClick={()=>setActiveCategory("water")}
>
💧 Water
</div>

<div
className="category-card"
onClick={()=>setActiveCategory("garbage")}
>
🗑 Garbage
</div>

<div
className="category-card"
onClick={()=>setActiveCategory("drainage")}
>
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
