import { useState, useEffect } from "react";
import "../styles/admin.css";
import "../styles/skeleton.css";
import { useNavigate } from "react-router-dom";
import { SkeletonBox, SkeletonCircle, SkeletonText } from "../components/Skeleton";

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


const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
const [logoutLoading, setLogoutLoading] = useState(false);
const logout = () => {
	setShowLogoutConfirm(true);
};
const confirmLogout = () => {
	setLogoutLoading(true);
	setTimeout(() => {
		localStorage.clear();
		navigate("/");
	}, 1200);
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
const [loadingData, setLoadingData] = useState(true);

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
const [issueLoading, setIssueLoading] = useState({});

const [popupMessage,setPopupMessage]=useState("");
const [pendingCounts, setPendingCounts] = useState({ electricity: 0, water: 0, garbage: 0, drainage: 0 });

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
	setLoadingData(true);
	const categories=["electricity","water","garbage","drainage"];
	let assigned=[];
	let progress=[];
	let overdue=[];
	let total=0;
	let pending=0;
	let resolved=0;
	let rejected=0;
	let pendingObj = {};
	for(const cat of categories){
		const res=await fetch(`http://localhost:5000/api/issues/${cat}`);
		const data=await res.json();
		const withCategory=data.map(i=>({...i,category:cat}));
		total+=withCategory.length;
		const catPending = withCategory.filter(i=>i.status==="Pending").length;
		pending+=catPending;
		pendingObj[cat] = catPending;
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
	setPendingCounts(pendingObj);
	setLoadingData(false);
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


const acceptIssue = async (id) => {
	if (!deadline[id]) {
		setPopupMessage("Select deadline");
		return;
	}
	setIssueLoading(prev => ({ ...prev, [id]: 'accept' }));
	try {
		const res = await fetch(`http://localhost:5000/api/issues/status/${activeCategory}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				status: "Assigned",
				deadline: deadline[id]
			})
		});
		const data = await res.json();
		if (data.emailSent) {
			setPopupMessage("Issue accepted and email sent to villager.");
		} else {
			setPopupMessage("Issue accepted but failed to send email to villager.");
		}
		await fetchIssues(activeCategory);
		await fetchAllIssues();
	} finally {
		setIssueLoading(prev => ({ ...prev, [id]: null }));
	}
};



/* REJECT ISSUE */


const rejectIssue = async (id) => {
	if (!rejectReason[id]) {
		setPopupMessage("Select rejection reason");
		return;
	}
	setIssueLoading(prev => ({ ...prev, [id]: 'reject' }));
	try {
		const res = await fetch(`http://localhost:5000/api/issues/status/${activeCategory}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				status: "Rejected",
				reason: rejectReason[id]
			})
		});
		const data = await res.json();
		if (data.emailSent) {
			setPopupMessage("Issue rejected and email sent to villager.");
		} else {
			setPopupMessage("Issue rejected but failed to send email to villager.");
		}
		await fetchIssues(activeCategory);
		await fetchAllIssues();
	} finally {
		setIssueLoading(prev => ({ ...prev, [id]: null }));
	}
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




// Responsive Carousel for Assigned/In Progress (Villager style)
const Carousel = ({ issues, title, loading, highlight }) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const isMobile = window.innerWidth <= 768;
  const visibleCount = isMobile ? 3 : issues.length;
  const total = issues.length;

  // Auto-scroll for mobile
  useEffect(() => {
    if (!isMobile || total <= 3) return;
    const interval = setInterval(() => {
      setScrollIndex(prev => (prev + 1) % (total - 2));
    }, 1200); // Faster speed (was 2200)
    return () => clearInterval(interval);
  }, [isMobile, total]);

  const getVisible = () => {
    if (!isMobile || total <= 3) return issues;
    return issues.slice(scrollIndex, scrollIndex + 3);
  };

  return (
    <div className="progress-section">
      <div className="section-header" style={{display:'flex',alignItems:'center',gap:8}}>
        <h2 className={`section-title${highlight ? ' highlight' : ''}`}>{title}</h2>
      </div>
      <div className="carousel" style={isMobile ? {overflowX:'auto'} : {}}>
        <div className="carousel-track" style={isMobile ? {gap:12, transition:'transform 0.6s cubic-bezier(.4,2,.6,1)'} : {}}>
          {loading ? (
            Array.from({length: isMobile ? 3 : 4}).map((_,i)=>(
              <div key={i} className="skeleton-card" style={{minWidth:260,maxWidth:260,height:220}}></div>
            ))
          ) : (
            getVisible().length === 0 ? (
              <p className="no-issues">No issues</p>
            ) : (
              getVisible().map(issue => (
                <IssueCard key={issue._id} issue={issue} />
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};



/* CATEGORY ISSUE LIST */


const renderIssues = () => {
    const list = (issues[activeCategory] || []).filter(
        issue => issue.status === "Pending"
    );
    return (
        <div>
            <div className="section-header" style={{display:'flex',alignItems:'center',gap:8}}>
                <h2 className="section-title highlight">{label(activeCategory)} Issues</h2>
            </div>
            {loadingData ? (
                <div className="issue-grid">
                    {Array.from({length:2}).map((_,i)=>(
                        <div key={i} className="skeleton-card" style={{minWidth:320,maxWidth:420,height:220}}></div>
                    ))}
                </div>
            ) : list.length === 0 ? (
                <p className="no-issues">No pending issues.</p>
            ) : (
                <div className="issue-grid">
                    {list.map(issue => (
                        <div key={issue._id} className="issue-card super-modern animate-fadein">
                            <div className="issue-left">
                                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4,flexWrap:'wrap'}}>
                                    <span className="category-tag" style={{position:'static',margin:0}}>{label(activeCategory)}</span>
                                    <span className="issue-title" style={{marginRight:8}}>{issue.villagerName}</span>
                                    <span className="aadhaar-stamp">(Aadhaar: {issue.aadhar})</span>
                                </div>
                                <div className="issue-meta" style={{display:'flex',flexWrap:'wrap',gap:12,marginBottom:6}}>
                                    <span><b>Street:</b> {issue.street}</span>
                                    {activeCategory !== "garbage" && <span><b>House No:</b> {issue.houseNo || 'N/A'}</span>}
                                </div>
                                <div className="desc" style={{marginBottom:8}}>{issue.description}</div>
                                <div className="issue-date-row" style={{display:'flex',gap:16,alignItems:'center',marginBottom:8}}>
                                    <span className="date-pill">📅 {issue.date}</span>
                                    <span className="date-pill">⏰ {issue.time}</span>
                                    {issue.deadline && <span className="date-pill deadline">Deadline: {issue.deadline}</span>}
                                </div>
                                <div className="reason-row" style={{display:'flex',gap:10,alignItems:'center',marginBottom:8}}>
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
                                        className="date-input"
                                    />
                                    <select
                                        value={rejectReason[issue._id]||""}
                                        onChange={(e)=>{
                                            e.stopPropagation();
                                            setRejectReason({
                                                ...rejectReason,
                                                [issue._id]:e.target.value
                                            });
                                        }}
                                        className="reason-select"
                                    >
                                        <option value="">Reason</option>
                                        <option>Duplicate issue</option>
                                        <option>Wrong category</option>
                                        <option>Fake complaint</option>
                                        <option>Already fixed</option>
                                    </select>
                                </div>
                                <div className="issue-actions">
                                    <button
                                        className={`approve-btn super-btn${issueLoading[issue._id]==='accept' ? ' loading' : ''}`}
                                        onClick={(e)=>{e.stopPropagation(); acceptIssue(issue._id);}}
                                        disabled={issueLoading[issue._id]==='accept'||issueLoading[issue._id]==='reject'}
                                    >
                                        {issueLoading[issue._id]==='accept' ? 'Accepting...' : 'Accept'}
                                    </button>
                                    <button
                                        className={`reject-btn super-btn${issueLoading[issue._id]==='reject' ? ' loading' : ''}`}
                                        onClick={(e)=>{e.stopPropagation(); rejectIssue(issue._id);}}
                                        disabled={issueLoading[issue._id]==='accept'||issueLoading[issue._id]==='reject'}
                                    >
                                        {issueLoading[issue._id]==='reject' ? 'Rejecting...' : 'Reject'}
                                    </button>
                                </div>
                            </div>
                            {issue.photoId && (
                                <div className="issue-right">
                                    <img src={`http://localhost:5000/api/files/${issue.photoId}`} alt="issue" className="issue-photo"/>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};




return (
	<div className="admin-container">
		{/* NAVBAR */}
		<div className="admin-navbar">
			<h2 style={{fontSize:'clamp(1.1rem,4vw,2.1rem)',fontWeight:800}}>Admin Dashboard</h2>
			<div className="admin-right">
				<div className="request-button" onClick={()=>setShowRequestPopup(true)}>
					Signup Requests
					{requests.length>0 && <span className="notification-dot"></span>}
				</div>
				<button className="logout-btn" onClick={logout} style={{fontSize:'clamp(0.9rem,2.5vw,1.1rem)',padding:'8px 14px'}}>
					Logout
				</button>
			</div>
		</div>

		{/* LOGOUT CONFIRMATION POPUP */}
		{showLogoutConfirm && (
			<div className="popup-overlay">
				<div className="popup-box">
					<p>Are you sure you want to logout?</p>
					<button onClick={confirmLogout} disabled={logoutLoading} style={{marginRight:8}}>
						{logoutLoading ? "Logging out..." : "Yes, Logout"}
					</button>
					<button onClick={()=>setShowLogoutConfirm(false)} disabled={logoutLoading}>
						Cancel
					</button>
				</div>
			</div>
		)}

		{/* REQUEST POPUP */}
		{showRequestPopup && (
			<div className="popup-overlay">
				<div className="popup-box">
					<h2>Signup Requests</h2>
					{requests.length===0 ? (
						<>
							<p>No signup requests.</p>
						</>
					) : (
						requests.map(user=>(
							<div key={user._id} className="request-card">
								<p><b>Name:</b> {user.name}</p>
								<p><b>Email:</b> {user.email}</p>
								<p><b>Aadhaar:</b> {user.aadhar}</p>
								<div className="request-actions">
									<button className="approve-btn" onClick={()=>approveUser(user._id)}>
										Approve
									</button>
									<button className="reject-btn" onClick={()=>rejectUser(user._id)}>
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
				{loadingData ? (
					Array.from({length:6}).map((_,i)=>(
						<div key={i} className="stat-card"><SkeletonBox height={38} /></div>
					))
				) : (
					<>
						<div className="stat-card">Total<br/>{stats.total}</div>
						<div className="stat-card pending">Pending<br/>{stats.pending}</div>
						<div className="stat-card assigned">Assigned<br/>{stats.assigned}</div>
						<div className="stat-card progress">Progress<br/>{stats.progress}</div>
						<div className="stat-card resolved">Resolved<br/>{stats.resolved}</div>
						<div className="stat-card rejected">Rejected<br/>{stats.rejected}</div>
					</>
				)}
			</div>
			<div className="charts">
				<div className="chart-box">
					<h3>Status Distribution</h3>
					{loadingData ? (
						<SkeletonBox height={250} />
					) : (
						<div className="responsive-chart-container">
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
					)}
				</div>
				<div className="chart-box">
					<h3>Status Comparison</h3>
					{loadingData ? (
						<SkeletonBox height={250} />
					) : (
						<div className="responsive-chart-container">
							<ResponsiveContainer width="100%" height={250}>
								<BarChart data={chartData}>
									<XAxis dataKey="name"/>
									<YAxis/>
									<Tooltip/>
									<Bar dataKey="value" fill="#2563eb"/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					)}
				</div>
			</div>
		</div>
		{/* ...existing code... */}



{/* OVERDUE ISSUES */}
<div className="overdue-section animated-overdue">
	<div className="section-header" style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
		<h2 className="section-title" style={{color:'#dc2626'}}>⚠ Overdue Tasks</h2>
	</div>
	{loadingData ? (
		<>
			<div className="skeleton-row" style={{height:32,marginBottom:8}}></div>
			<div className="skeleton-row" style={{height:32,marginBottom:8}}></div>
		</>
	) : overdueIssues.length === 0 ? (
		<p className="no-issues">No overdue issues.</p>
	) : (
		<div className="overdue-grid overdue-scroll">
			{overdueIssues.map(i => (
				<div key={i._id} className="overdue-card animated-overdue-card">
					<p><b>Street:</b> {i.street}</p>
					<p><b>Deadline:</b> <span style={{color:'#dc2626'}}>{i.deadline}</span></p>
					<p style={{fontWeight:600,color:'#64748b'}}>{label(i.category)}</p>
				</div>
			))}
		</div>
	)}
</div>



{/* ASSIGNED */}
<Carousel title="Assigned Issues" issues={assignedIssues} loading={loadingData} highlight/>

{/* IN PROGRESS */}
<Carousel title="In Progress Issues" issues={progressIssues} loading={loadingData} highlight/>


{/* CATEGORY CARDS */}

<div className="category-section">
    <div className="section-header" style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
        <h2 className="section-title highlight">Reported Issues</h2>
    </div>
    <div className="category-cards">
        {['electricity','water','garbage','drainage'].map(cat => (
            <div
                key={cat}
                className={`category-card${activeCategory===cat ? ' active' : ''}`}
                onClick={()=>{setActiveCategory(cat);fetchIssues(cat)}}
                style={{position:'relative' }}
            >
                {label(cat)}
                {pendingCounts[cat]>0 && <span className="notification-dot moving-dot"></span>}
            </div>
        ))}
    </div>
</div>


{/* CATEGORY ISSUES */}

<div className="issue-section">
{activeCategory && renderIssues()}
</div>


{/* EMAIL POPUP */}

{popupMessage &&(

<div className="popup-overlay">

<div className="popup-box">

<p>{popupMessage}</p>

<button className="close-popup" onClick={()=>setPopupMessage("")}>
Close
</button>

</div>

</div>

)}


</div>

);

}