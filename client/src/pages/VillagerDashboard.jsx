import { useState, useEffect } from "react";
import "../styles/villager.css";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const IssueCard = ({ issue, label }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const statusClass = issue.status === "Assigned" ? "badge-assigned" : issue.status === "Resolved" ? "badge-resolved" : issue.status === "Rejected" ? "badge-rejected" : issue.status === "Pending" ? "badge-pending" : "badge-progress";

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

/* ─── Status configuration ─── */
const STATUS_STEPS = ['Pending', 'Assigned', 'In Progress', 'Resolved'];
const STATUS_ICONS = { Pending: '🕒', Assigned: '👤', 'In Progress': '🔧', Resolved: '✅', Rejected: '❌' };
const CAT_COLOR = {
  electricity: { bg: '#fef3c7', color: '#d97706', border: '#fde68a' },
  water:       { bg: '#e0f2fe', color: '#0284c7', border: '#bae6fd' },
  garbage:     { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  drainage:    { bg: '#f3e8ff', color: '#7c3aed', border: '#ddd6fe' },
};

function StatusStepper({ status }) {
  if (status === 'Rejected') {
    return (
      <div className="mi2-rejected-bar">
        <span>❌</span> This issue was <strong>Rejected</strong>
      </div>
    );
  }
  const activeIdx = STATUS_STEPS.indexOf(status);
  return (
    <div className="mi2-stepper">
      {STATUS_STEPS.map((step, idx) => {
        const done    = idx < activeIdx;
        const current = idx === activeIdx;
        return (
          <div key={step} className="mi2-step-wrap">
            <div className={`mi2-step-node ${done ? 'done' : ''} ${current ? 'active' : ''}`}>
              {done ? '✔' : STATUS_ICONS[step]}
            </div>
            <span className={`mi2-step-label ${current ? 'active-label' : ''} ${done ? 'done-label' : ''}`}>{step}</span>
            {idx < STATUS_STEPS.length - 1 && (
              <div className={`mi2-step-line ${done || current ? 'filled' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function MyIssueCard({ issue, label, idx }) {
  const [expanded, setExpanded] = useState(false);
  const colors = CAT_COLOR[issue.category] || CAT_COLOR.garbage;
  const isRejected = issue.status === 'Rejected';

  return (
    <div
      className={`mi2-card ${isRejected ? 'mi2-rejected' : ''}`}
      style={{ animationDelay: `${idx * 0.07}s` }}
    >
      {/* Top row */}
      <div className="mi2-card-top">
        <span className="mi2-cat-badge" style={{ background: colors.bg, color: colors.color, border: `1.5px solid ${colors.border}` }}>
          {label(issue.category)}
        </span>
        <span className="mi2-date">📅 {issue.date}</span>
      </div>

      {/* Location row */}
      <div className="mi2-location">
        <span>📍 Street {issue.street}</span>
        {issue.houseNo && <span> · 🏠 {issue.houseNo}</span>}
      </div>

      {/* Status stepper */}
      <StatusStepper status={issue.status} />

      {/* Collapsed preview */}
      <p className="mi2-preview">
        {issue.description.length > 80 ? issue.description.slice(0, 80) + '…' : issue.description}
      </p>

      {/* Track Details toggle */}
      <button className="mi2-toggle-btn" onClick={() => setExpanded(e => !e)}>
        {expanded ? '▲ Hide Details' : '🔍 Track Details'}
      </button>

      {/* Expanded content */}
      <div className={`mi2-expand ${expanded ? 'open' : ''}`}>
        <div className="mi2-expand-inner">
          <p className="mi2-full-desc">{issue.description}</p>
          {issue.photoId && (
            <img
              className="mi2-photo"
              src={`/api/files/${issue.photoId}`}
              alt="Issue"
            />
          )}
          {isRejected && issue.reason && (
            <div className="mi2-reason">
              <strong>❌ Rejection Reason:</strong> {issue.reason}
            </div>
          )}
          <div className="mi2-meta-row">
            <span>🕒 {issue.time}</span>
            <span>📂 {issue.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VillagerDashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  const [loadingData, setLoadingData] = useState(true);
  const [toast, setToast] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({ email: "", aadhar: "" });
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [progressIssues, setProgressIssues] = useState([]);
  const [resolvedIssues, setResolvedIssues] = useState([]);
  const [myIssues, setMyIssues] = useState([]);
  const [filterCat, setFilterCat] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

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

  const filteredMyIssues = myIssues.filter(i => {
    const catOk = filterCat === 'all' || i.category === filterCat;
    const statusOk = filterStatus === 'all' || i.status === filterStatus;
    return catOk && statusOk;
  });

  return (
    <div className="villager-container">
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="header-title">🏘️ Villager Dashboard</h1>
          <span className="header-badge">Live System</span>
        </div>

        {/* Desktop — hidden on mobile via CSS */}
        <div className="vd-desktop-btns">
          <button
            className="premium-logout"
            onClick={() => navigate("/villager/feedback")}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
          >
            <span className="logout-icon">⭐</span> Give Feedback
          </button>
          <button className="premium-logout" onClick={() => setShowLogoutConfirm(true)}>
            <span className="logout-icon">⏻</span> {logoutLoading ? "..." : "Logout"}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="vd-hamburger"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Mobile dropdown — lives inside sticky header so it scrolls with it */}
        <div className={`vd-mobile-menu${mobileMenuOpen ? ' open' : ''}`}>
          <button
            className="vd-menu-item"
            onClick={() => { setMobileMenuOpen(false); navigate('/villager/feedback'); }}
          >
            <span>⭐</span> Give Feedback
          </button>
          <button
            className="vd-menu-item vd-menu-logout"
            onClick={() => { setMobileMenuOpen(false); setShowLogoutConfirm(true); }}
          >
            <span>⏻</span> Logout
          </button>
        </div>
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

      {/* MY ISSUES — Premium */}
      <div className="mi2-section module-box">
        <div className="section-header" style={{ marginTop: 0 }}>
          <h2 className="section-title">📋 My Tracked Issues</h2>
          <p className="section-sub">Track the real-time status of all your reported issues.</p>
        </div>

        {/* Filter Bar */}
        {!loadingData && myIssues.length > 0 && (
          <div className="mi2-filter-bar">
            <div className="mi2-filter-group">
              <span className="mi2-filter-label">Category</span>
              {['all', 'electricity', 'water', 'garbage', 'drainage'].map(cat => (
                <button
                  key={cat}
                  className={`mi2-filter-btn${filterCat === cat ? ' active' : ''}`}
                  onClick={() => setFilterCat(cat)}
                >
                  {cat === 'all' ? '🔍 All' : label(cat)}
                </button>
              ))}
            </div>
            <div className="mi2-filter-group">
              <span className="mi2-filter-label">Status</span>
              {['all', 'Pending', 'Assigned', 'In Progress', 'Resolved', 'Rejected'].map(st => (
                <button
                  key={st}
                  className={`mi2-filter-btn mi2-filter-status ${st.toLowerCase().replace(/\s+/g, '-')}${filterStatus === st ? ' active' : ''}`}
                  onClick={() => setFilterStatus(st)}
                >
                  {st === 'all' ? '🔍 All' : st}
                </button>
              ))}
            </div>
          </div>
        )}

        {loadingData ? (
          <div className="mi2-grid">
            {[1, 2, 3].map((n) => (
              <div key={n} className="skeleton-stat" style={{ height: 200 }} />
            ))}
          </div>
        ) : myIssues.length === 0 ? (
          <div className="mi2-empty">
            <span>📭</span>
            <p>No issues reported yet. Raise a complaint above!</p>
          </div>
        ) : filteredMyIssues.length === 0 ? (
          <div className="mi2-empty">
            <span>🔎</span>
            <p>No issues match the selected filters.</p>
          </div>
        ) : (
          <div className={`mi2-grid${filteredMyIssues.length > 4 ? ' mi2-grid--scroll' : ''}`}>
            {filteredMyIssues.map((issue, idx) => (
              <MyIssueCard key={issue._id} issue={issue} label={label} idx={idx} />
            ))}
          </div>
        )}
      </div>

      <div className="module-box">
        <Carousel title="✅ Resolved Issues" issues={resolvedIssues} label={label} />
      </div>
    </div>
  );
}