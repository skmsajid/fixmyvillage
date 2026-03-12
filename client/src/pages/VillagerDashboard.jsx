import { useState } from "react";
import "../styles/villager.css";
import { useNavigate } from "react-router-dom";

export default function VillagerDashboard(){

const navigate = useNavigate();

const userName = localStorage.getItem("userName");
const userId = localStorage.getItem("userId");

const logout = ()=>{
localStorage.clear();
navigate("/");
};

const [activeForm,setActiveForm] = useState("");

const [formData,setFormData] = useState({
street:"",
pipeline:"",
pole:"",
houseNo:"",
description:"",
photo:null
});

const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};

const handlePhoto = (e)=>{
setFormData({
...formData,
photo:e.target.files[0]
});
};

const resetForm = ()=>{
setFormData({
street:"",
pipeline:"",
pole:"",
houseNo:"",
description:"",
photo:null
});
};

const submitIssue = async ()=>{

if(!activeForm){
alert("Please select issue category");
return;
}

if(!formData.street){
alert("Street is required");
return;
}

if(!formData.description){
alert("Description is required");
return;
}

if(!formData.photo){
alert("Please upload photo");
return;
}

const data = new FormData();

data.append("street",formData.street);
data.append("pipeline",formData.pipeline);
data.append("pole",formData.pole);
data.append("houseNo",formData.houseNo);
data.append("description",formData.description);
data.append("photo",formData.photo);

data.append("userId",userId);
data.append("date",new Date().toLocaleDateString());
data.append("time",new Date().toLocaleTimeString());

try{

const res = await fetch(`http://localhost:5000/api/issues/${activeForm}`,{
method:"POST",
body:data
});

const result = await res.json();

if(!res.ok){
alert(result.message || "Submission failed");
return;
}

alert("Issue Submitted Successfully");

resetForm();
setActiveForm("");

}catch(err){

console.error(err);
alert("Server error");

}

};

return(

<div className="villager-container">

<h1 className="dashboard-title">Villager Dashboard</h1>

<div className="user-box">
<h3>Welcome, {userName}</h3>
<p>User ID: {userId}</p>
</div>

<button className="logout-btn" onClick={logout}>Logout</button>

{/* ISSUE CARDS */}

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

{/* ========================
GARBAGE FORM
======================== */}

{activeForm==="garbage" && (

<div className="report-box">

<h2>Report Garbage Issue</h2>

<input
placeholder="Street"
name="street"
value={formData.street}
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


{/* ========================
WATER FORM
======================== */}

{activeForm==="water" && (

<div className="report-box">

<h2>Report Water Issue</h2>

<input
placeholder="Street"
name="street"
value={formData.street}
onChange={handleChange}
/>

<input
placeholder="Pipeline"
name="pipeline"
value={formData.pipeline}
onChange={handleChange}
/>

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


{/* ========================
ELECTRICITY FORM
======================== */}

{activeForm==="electricity" && (

<div className="report-box">

<h2>Report Electricity Issue</h2>

<input
placeholder="Street"
name="street"
value={formData.street}
onChange={handleChange}
/>

<input
placeholder="Pole Number"
name="pole"
value={formData.pole}
onChange={handleChange}
/>

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


{/* ========================
DRAINAGE FORM
======================== */}

{activeForm==="drainage" && (

<div className="report-box">

<h2>Report Drainage Issue</h2>

<input
placeholder="Street"
name="street"
value={formData.street}
onChange={handleChange}
/>

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

</div>

);

}
