import { useState, useEffect } from "react";
import "../styles/villager.css";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

export default function VillagerDashboard() {

  const navigate = useNavigate();

  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  /* STATES */
  const [loadingData, setLoadingData] = useState(true);
  const [toast, setToast] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: "",
    aadhar: ""
  });

  const [assignedIssues, setAssignedIssues] = useState([]);
  const [progressIssues, setProgressIssues] = useState([]);
  const [resolvedIssues, setResolvedIssues] = useState([]);
  const [myIssues, setMyIssues] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    assigned: 0,
    progress: 0,
    resolved: 0
  });

  const [activeForm, setActiveForm] = useState("");

  const [formData, setFormData] = useState({
    street: "",
    pipeline: "",
    pole: "",
    houseNo: "",
    description: "",
    photo: null
  });

  /* TOAST */
  const showToast = (msg, type) => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* LOGOUT */
  const logout = async () => {
    setLogoutLoading(true);
    setTimeout(() => {
      localStorage.clear();
      navigate("/");
    }, 1200);
  };

  /* USER INFO */
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/users/${userId}`);
        const data = await res.json();

        setUserInfo({
          email: data.email,
          aadhar: data.aadhar
        });

      } catch {
        showToast("User load failed", "error");
      }
    };

    if (userId) fetchUserInfo();
  }, [userId]);

  /* ISSUES */
  useEffect(() => {
    const fetchIssues = async () => {
      setLoadingData(true);

      try {
        const categories = ["electricity", "water", "garbage", "drainage"];

        let assigned = [], progress = [], resolved = [], my = [], total = 0;

        for (const cat of categories) {
          const res = await fetch(`http://localhost:5000/api/issues/${cat}`);
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

        setStats({
          total,
          assigned: assigned.length,
          progress: progress.length,
          resolved: resolved.length
        });

      } catch {
        showToast("Issues load failed", "error");
      }

      setLoadingData(false);
    };

    fetchIssues();
  }, [userId]);

  /* FORM */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const resetForm = () => {
    setFormData({
      street: "",
      pipeline: "",
      pole: "",
      houseNo: "",
      description: "",
      photo: null
    });
  };

  /* SUBMIT */
  const submitIssue = async () => {

    if (!activeForm) return showToast("Select category", "error");
    if (!formData.street) return showToast("Street required", "error");
    if (!formData.description) return showToast("Description required", "error");
    if (!formData.photo) return showToast("Upload photo", "error");

    const data = new FormData();

    Object.keys(formData).forEach(k => data.append(k, formData[k]));

    data.append("userId", userId);
    data.append("date", new Date().toLocaleDateString());
    data.append("time", new Date().toLocaleTimeString());

    try {
      const res = await fetch(`http://localhost:5000/api/issues/${activeForm}`, {
        method: "POST",
        body: data
      });

      if (!res.ok) return showToast("Submission failed", "error");

      showToast("Issue submitted", "success");
      resetForm();
      setActiveForm("");

    } catch {
      showToast("Server error", "error");
    }
  };

  const label = (cat) => {
    if (cat === "electricity") return "⚡ Electricity";
    if (cat === "water") return "💧 Water";
    if (cat === "garbage") return "🗑 Garbage";
    if (cat === "drainage") return "🚰 Drainage";
  };

  /* CAROUSEL */
  /* 🔄 CAROUSEL */
const Carousel = ({ issues, title }) => (
  <div className="progress-section">

    <h2 className="section-title">{title}</h2>

    <div className="carousel">
      <div className="carousel-track infinite">

        {loadingData
          ? [1,2,3,4].map(i => (
              <div key={i} className="skeleton-card"></div>
            ))
          : [...issues, ...issues].map((issue, i) => (

              <div key={i} className="issue-progress-card">

                <div className="category-tag">{label(issue.category)}</div>

                {issue.photoId && (
                  <img src={`http://localhost:5000/api/files/${issue.photoId}`} alt="" />
                )}

                <div className="issue-info">
                  <p><b>Street:</b> {issue.street}</p>
                  <p className="desc">{issue.description}</p>
                  <p className="status">{issue.status}</p>

                  {issue.deadline && (
                    <p className="deadline">Deadline: {issue.deadline}</p>
                  )}
                </div>

              </div>

          ))
        }

      </div>
    </div>

  </div>
);
  return (

    <div className="villager-container">

      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* HEADER */}
      <div className="dashboard-header premium-header">

  <div className="header-left">
    <h1 className="header-title">
      🏘️ Villager Dashboard
    </h1>
    <span className="header-badge">Live System</span>
  </div>

  <button
    className="logout-btn premium-logout"
    onClick={() => setShowLogoutConfirm(true)}
  >
    <span className="logout-icon">⏻</span>
    Logout
  </button>

</div>

      {/* LOGOUT POPUP */}
      {showLogoutConfirm && (
        <div className="logout-popup">
          <div className="popup-box">
            <p>Are you sure to logout?</p>

            <button onClick={logout} disabled={logoutLoading}>
              {logoutLoading ? "Logging out..." : "Yes"}
            </button>

            <button onClick={() => setShowLogoutConfirm(false)}>
              Cancel
            </button>
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
              <h3>{userName}</h3>
              <p><b>Aadhaar:</b> {userInfo.aadhar}</p>
              <p><b>Email:</b> {userInfo.email}</p>
            </div>

            <div>User ID: {userId}</div>
          </>
        )}

      </div>

      {/* STATS */}
      <div className="stats-grid">

        {loadingData
          ? [1,2,3,4].map(i => <div key={i} className="skeleton-stat"></div>)
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

      <Carousel title="🟡 Assigned Issues" issues={assignedIssues} />
      <Carousel title="🔵 In Progress Issues" issues={progressIssues} />

      {/* CATEGORY */}
      
<div className="section-header">
  <h2 className="section-title highlight">Raise a Complaint</h2>
  <p className="section-sub">Select issue type to report your problem</p>
</div>

<div className="issue-cards">
        <div className="card" onClick={() => setActiveForm("garbage")}>🗑 Garbage</div>
        <div className="card" onClick={() => setActiveForm("water")}>💧 Water</div>
        <div className="card" onClick={() => setActiveForm("electricity")}>⚡ Electricity</div>
        <div className="card" onClick={() => setActiveForm("drainage")}>🚰 Drainage</div>
      </div>

      {/* FORM */}
      {activeForm && (
        <div className="report-box">

          <h2>Report {label(activeForm)}</h2>

          <input name="street" placeholder="Street" onChange={handleChange} />
          <input name="houseNo" placeholder="House No" onChange={handleChange} />

          <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>

          <input type="file" onChange={handlePhoto} />

          <button className="report-btn" onClick={submitIssue}>
            Submit
          </button>

        </div>
      )}

      {/* MY ISSUES */}
      <div className="my-issues">

  <h2 className="section-title">My Issues</h2>

  {loadingData ? (
    <div className="table-wrapper">
      {[1,2,3,4].map(i => (
        <div key={i} className="skeleton-row"></div>
      ))}
    </div>
  ) : myIssues.length === 0 ? (
    <p className="empty">No issues</p>
  ) : (
    <div className="table-wrapper">
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
          {myIssues.map(i => (
            <tr key={i._id}>
              <td>{label(i.category)}</td>
              <td>{i.street}</td>
              <td className="status">{i.status === "Rejected" ? `Rejected (${i.reason || "No reason"})` : i.status}</td>
              <td>{i.date}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )}

</div>

      <Carousel title="✅ Resolved Issues" issues={resolvedIssues} />

    </div>
  );
}