import { useState, useEffect } from "react";
import "../styles/villager.css";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const IssueCard = ({ issue, label }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const statusClass = issue.status === "Assigned" ? "badge-assigned" : issue.status === "Resolved" ? "badge-resolved" : issue.status === "Rejected" ? "badge-rejected" : "badge-progress";

  return (
    <div className="ipc-card">
      {issue.photoId ? (
        <div className="ipc-img-wrap">
          <div className={`ipc-cat-pill ${issue.category}`}>{label(issue.category)}</div>
          {!imgLoaded && <div className="ipc-img-skeleton" />}
          <img
            src={`/api/files/${issue.photoId}`}
            alt="issue"
            className="ipc-img"
            onLoad={() => setImgLoaded(true)}
            style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.4s ease" }}
          />
        </div>
      ) : (
        <div className="ipc-body-pill">
          <span className={`ipc-cat-pill ${issue.category}`}>{label(issue.category)}</span>
        </div>
      )}
      <div className="ipc-body">
        <div className="ipc-row"><span className="ipc-icon">📍</span><span><b>Street&nbsp;</b>{issue.street}</span></div>
        {issue.houseNo && <div className="ipc-row"><span className="ipc-icon">🏠</span><span><b>House&nbsp;</b>{issue.houseNo}</span></div>}
        <p className="ipc-desc">{issue.description}</p>
        <div className="ipc-footer">
          <span className={`ipc-status ${statusClass}`}>{issue.status}</span>
          {issue.deadline && <span className="ipc-deadline">📅 {issue.deadline}</span>}
        </div>
      </div>
    </div>
  );
};

const Carousel = ({ issues, title, highlight, label }) => {
  const total = issues.length;
  const useCarousel = total > 4;
  const duration = Math.max(total * 3, 14);

  return (
    <div className="progress-section">
      <div className="section-header" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h2 className={`section-title${highlight ? ' highlight' : ''}`}>{title}</h2>
        {useCarousel && <span className="carousel-badge">{total} issues</span>}
      </div>

      {total === 0 ? (
        <p style={{ color: '#64748b', fontWeight: 500 }}>No issues found in this category.</p>
      ) : useCarousel ? (
        <div className="crs-wrap">
          <div className="crs-marquee" style={{ animationDuration: `${duration}s` }}>
            {[...issues, ...issues].map((issue, idx) => (
              <IssueCard key={`${issue._id}-${idx}`} issue={issue} label={label} />
            ))}
          </div>
        </div>
      ) : (
        <div className="crs-static">
          {issues.map(issue => (
            <IssueCard key={issue._id} issue={issue} label={label} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function VillagerDashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  const [loadingData, setLoadingData] = useState(true);
  const [toast, setToast] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [userInfo, setUserInfo] = useState({ email: "", aadhar: "" });
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [progressIssues, setProgressIssues] = useState([]);
  const [resolvedIssues, setResolvedIssues] = useState([]);
  const [myIssues, setMyIssues] = useState([]);

  const [stats, setStats] = useState({ total: 0, assigned: 0, progress: 0, resolved: 0 });
  const [activeForm, setActiveForm] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({ street: "", houseNo: "", description: "", photo: null });

  const showToast = (msg, type) => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const logout = async () => {
    setLogoutLoading(true);
    setTimeout(() => { localStorage.clear(); navigate("/"); }, 1200);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`/api/auth/users/${userId}`);
        const data = await res.json();
        setUserInfo({ email: data.email, aadhar: data.aadhar });
      } catch {
        showToast("User load failed", "error");
      }
    };
    if (userId) fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    const fetchIssues = async () => {
      setLoadingData(true);
      try {
        const categories = ["electricity", "water", "garbage", "drainage"];
        let assigned = [], progress = [], resolved = [], my = [], total = 0;

        for (const cat of categories) {
          const res = await fetch(`/api/issues/${cat}`);
          const data = await res.json();
          const issues = data.map(i => ({ ...i, category: cat }));
          total += issues.length;
          assigned.push(...issues.filter(i => i.status === "Assigned"));
          progress.push(...issues.filter(i => i.status === "In Progress"));
          resolved.push(...issues.filter(i => i.status === "Resolved"));
          my.push(...issues.filter(i => i.userId === userId));
        }

        setAssignedIssues(assigned);
        setProgressIssues(progress);
        setResolvedIssues(resolved);
        setMyIssues(my);
        setStats({ total, assigned: assigned.length, progress: progress.length, resolved: resolved.length });
      } catch {
        showToast("Issues load failed", "error");
      }
      setLoadingData(false);
    };
    fetchIssues();
  }, [userId]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePhoto = (e) => setFormData({ ...formData, photo: e.target.files[0] });
  const resetForm = () => setFormData({ street: "", houseNo: "", description: "", photo: null });

  const submitIssue = async () => {
    if (submitLoading) return;
    if (!formData.houseNo) return showToast("House No required", "error");
    if (!activeForm) return showToast("Select category", "error");
    if (!formData.street) return showToast("Street required", "error");
    if (!formData.description) return showToast("Description required", "error");
    if (!formData.photo) return showToast("Upload photo", "error");

    setSubmitLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(k => data.append(k, formData[k]));
    data.append("userId", userId);
    data.append("date", new Date().toLocaleDateString());
    data.append("time", new Date().toLocaleTimeString());

    try {
      const res = await fetch(`/api/issues/${activeForm}`, { method: "POST", body: data });
      if (!res.ok) { setSubmitLoading(false); return showToast("Submission failed", "error"); }
      showToast("Issue submitted successfully!", "success");
      resetForm();
      setActiveForm("");
    } catch {
      showToast("Server error", "error");
    }
    setSubmitLoading(false);
  };

  const label = (cat) => {
    if (cat === "electricity") return "⚡ Electricity";
    if (cat === "water") return "💧 Water";
    if (cat === "garbage") return "🗑 Garbage";
    if (cat === "drainage") return "🚰 Drainage";
  };

  return (
    <div className="villager-container">
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="header-title">🏘️ Villager Dashboard</h1>
          <span className="header-badge">Live System</span>
        </div>
        <button className="premium-logout" onClick={() => setShowLogoutConfirm(true)}>
          <span className="logout-icon">⏻</span> {logoutLoading ? "..." : "Logout"}
        </button>
      </div>

      {/* LOGOUT POPUP */}
      {showLogoutConfirm && (
        <div className="overlay">
          <div className="popup-box">
            <div className="popup-icon">👋</div>
            <h3>Sign Out</h3>
            <p>Are you sure you want to log out of your account?</p>
            <div className="popup-actions">
              <button className="popup-btn btn-primary" onClick={logout} disabled={logoutLoading}>
                {logoutLoading ? "Logging out..." : "Yes, Logout"}
              </button>
              <button className="popup-btn btn-secondary" onClick={() => setShowLogoutConfirm(false)} disabled={logoutLoading}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* USER */}
      <div className="user-box">
        {loadingData ? (
          <div className="skeleton-user"></div>
        ) : (
          <>
            <div>
              <h3>👋 Welcome, {userName}!</h3>
              <p><b>Aadhaar:</b> {userInfo.aadhar}</p>
              <p><b>Email:</b> {userInfo.email}</p>
            </div>
            <div className="user-id-badge">ID: {userId}</div>
          </>
        )}
      </div>

      {/* STATS */}
      <div className="stats-grid">
        {loadingData
          ? [1, 2, 3, 4].map(i => <div key={i} className="skeleton-stat"></div>)
          : (
            <>
              <div className="stat-card"><h3>Total Issues</h3><p>{stats.total}</p></div>
              <div className="stat-card"><h3>Assigned</h3><p>{stats.assigned}</p></div>
              <div className="stat-card"><h3>In Progress</h3><p>{stats.progress}</p></div>
              <div className="stat-card"><h3>Resolved</h3><p>{stats.resolved}</p></div>
            </>
          )
        }
      </div>

      <div className="module-box">
        <Carousel title="🟡 Assigned Issues" issues={assignedIssues} label={label} />
        <Carousel title="🔵 In Progress Issues" issues={progressIssues} label={label} />
      </div>

      {/* REPORT COMPLAINT */}
      <div className="module-box">
        <div className="section-header" style={{ marginTop: 0 }}>
          <h2 className="section-title highlight">Raise a Complaint</h2>
          <p className="section-sub">Select an issue type below to report your problem to the authorities.</p>
        </div>

        <div className="issue-cards">
          {["garbage", "water", "electricity", "drainage"].map(cat => (
            <div key={cat} className={`card cat-${cat} ${activeForm === cat ? 'active' : ''}`} onClick={() => setActiveForm(cat)}>
              {label(cat)}
            </div>
          ))}
        </div>

        {activeForm && (
          <div className="report-box">
            <h2>Report {label(activeForm)}</h2>
            <div className="form-grid">
              <input type="text" name="street" placeholder="Street No" value={formData.street} onChange={handleChange} />
              <input type="text" name="houseNo" placeholder="House No" value={formData.houseNo} onChange={handleChange} />
              <div className="form-full">
                <textarea name="description" placeholder="Describe the issue in detail..." value={formData.description} onChange={handleChange}></textarea>
              </div>
              <div className="form-full file-input-wrapper">
                <input type="file" onChange={handlePhoto} accept="image/*" />
                <p style={{ fontSize: 13, color: '#64748b', margin: '8px 0 0 0' }}>Upload a photo of the issue</p>
              </div>
            </div>
            <button className="report-btn" onClick={submitIssue} disabled={submitLoading}>
              {submitLoading ? "Submitting..." : "Submit Complaint"}
            </button>
          </div>
        )}
      </div>

      {/* MY ISSUES */}
      <div className="my-issues module-box">
        <div className="section-header">
          <h2 className="section-title">My Tracked Issues</h2>
          <p className="section-sub">View the status of issues you have successfully reported.</p>
        </div>

        {loadingData ? (
          <div className="my-issues-grid">
            {[1, 2, 3].map(i => <div key={i} className="skeleton-stat" style={{ height: 180 }}></div>)}
          </div>
        ) : myIssues.length === 0 ? (
          <p style={{ color: '#64748b', fontWeight: 500, padding: 20 }}>No reported issues found.</p>
        ) : (
          <div className="my-issues-grid">
            {myIssues.map((i, index) => {
              const statusClass = i.status === "Assigned" ? "badge-assigned" : i.status === "Resolved" ? "badge-resolved" : i.status === "Rejected" ? "badge-rejected" : "badge-progress";
              return (
                <div key={i._id} className="my-issue-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="my-issue-header">
                    <span className="mi-cat">{label(i.category)}</span>
                    <span className="mi-date">{i.date} {i.time}</span>
                  </div>
                  <div className="mi-body">
                    <p><b>House No:</b> {i.houseNo}</p>
                    <p><b>Street:</b> {i.street}</p>
                    <p><b>Details:</b> {i.description.length > 50 ? i.description.substring(0, 50) + "..." : i.description}</p>

                  </div>
                  <div className="mi-footer">
                    <span className={`ipc-status ${statusClass}`}>{i.status === "Rejected" ? `Rejected (${i.reason || "No reason"})` : i.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="module-box">
        <Carousel title="✅ Resolved Issues" issues={resolvedIssues} label={label} />
      </div>
    </div>
  );
}