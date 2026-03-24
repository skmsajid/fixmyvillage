import { useState, useEffect } from "react";
import "../styles/worker.css";
import { useNavigate } from "react-router-dom";
import { SkeletonBox } from "../components/Skeleton";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  Tooltip, Legend, BarChart, Bar, XAxis, YAxis
} from "recharts";

const STATUS = ["Assigned", "In Progress", "Resolved"];

function TaskImageWithSkeleton({ photoId }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className="task-right">
      {!imgLoaded && <div className="task-img-skeleton" />}
      <img
        src={`/api/files/${photoId}`}
        alt="issue"
        style={{ display: imgLoaded ? 'block' : 'none' }}
        onLoad={() => setImgLoaded(true)}
      />
    </div>
  );
}

export default function WorkerDashboard() {

  const navigate = useNavigate();

  /* 🔥 STATES */
  const [confirmBox, setConfirmBox] = useState({
    show: false,
    message: "",
    action: null
  });

  const [actionLoading, setActionLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [popup, setPopup] = useState({ show: false, message: "" });

  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState({
    electricity: [],
    water: [],
    garbage: [],
    drainage: []
  });

  /* 🔧 HELPERS */
  const openConfirm = (message, action) => {
    setConfirmBox({ show: true, message, action });
  };

  const closeConfirm = () => {
    setConfirmBox({ show: false, message: "", action: null });
  };

  const showPopup = (msg) => {
    setPopup({ show: true, message: msg });
    setTimeout(() => setPopup({ show: false, message: "" }), 2500);
  };

  /* 🔐 LOGOUT WITH ANIMATION */
  const logout = () => {
    openConfirm("Are you sure you want to logout?", async () => {
      setLogoutLoading(true);

      setTimeout(() => {
        localStorage.clear();
        navigate("/");
      }, 1500);
    });
  };

  /* FETCH */
  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch("/api/issues/electricity").then(res => res.json()),
      fetch("/api/issues/water").then(res => res.json()),
      fetch("/api/issues/garbage").then(res => res.json()),
      fetch("/api/issues/drainage").then(res => res.json())
    ])
      .then(([electricity, water, garbage, drainage]) => {
        setTasks({ electricity, water, garbage, drainage });
      })
      .finally(() => setLoading(false));

  }, []);

  /* UPDATE */
  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/issues/status/${activeCategory}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    let emailSent = false;
    try {
      const data = await res.json();
      emailSent = data.emailSent;
    } catch (e) {}

    setTasks(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map(task =>
        task._id === id ? { ...task, status } : task
      )
    }));
    return emailSent;
  };

  /* COMPLETE */
  const resolveIssue = (id) => {
    openConfirm("Mark this task as completed?", async () => {
      setActionLoading(true);
      const emailSent = await updateStatus(id, "Resolved");
      setActionLoading(false);
      if (emailSent === true) {
        showPopup("✅ Task completed! Email sent to villager.");
      } else if (emailSent === false) {
        showPopup("✅ Task completed! Email could not be sent.");
      } else {
        showPopup("✅ Task completed!");
      }
    });
  };
const getDeadlineInfo = (deadline) => {
  if (!deadline) return null;

  const today = new Date();
  const d = new Date(deadline);

  const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));

  if (diff > 0) {
    return `${diff} day${diff > 1 ? "s" : ""} left`;
  } else if (diff === 0) {
    return "Due today";
  } else {
    return "❌ Deadline Over";
  }
};
  /* TASK LIST */
  const renderTasks = () => {

    const list = (tasks[activeCategory] || []).filter(
      task => task.status === "Assigned" || task.status === "In Progress"
    );

    if (list.length === 0) {
      return <p className="no-tasks">No assigned tasks.</p>;
    }

    return (
      <div className="task-grid">
        {list.map(task => (
          <div key={task._id} className="task-card">


            <div className="task-left">
              <h3 style={{marginBottom: 8, color: '#2563eb', fontWeight: 800, fontSize: '1.13rem', letterSpacing: '0.01em'}}>
                {activeCategory.toUpperCase()} TASK
              </h3>
              <div className="task-detail-row">
  <span className="task-detail-label">Street:</span>
  <span className="task-detail-value">{task.street}</span>
</div>

<div className="task-detail-row">
  <span className="task-detail-label">House No:</span>
  <span className="task-detail-value">{task.houseNo}</span>
</div>
              <div className="task-detail-row">
  <span className="task-detail-label">Status:</span>
  <span className="task-status-inprogress">{task.status}</span>
</div>

<div className="task-detail-row">
  <span className="task-detail-label">Description:</span>
  <span className="task-detail-value">{task.description}</span>
</div>

{task.deadline && (
  <div className="task-detail-row deadline-row">
    <span className="task-detail-label">Deadline:</span>
    <span className="task-deadline">{task.deadline}</span>

    <span className={`deadline-status ${
      getDeadlineInfo(task.deadline).includes("Over")
        ? "expired"
        : "active"
    }`}>
      {getDeadlineInfo(task.deadline)}
    </span>
  </div>
)}
              <div className="task-actions">
                {task.status === "Assigned" && (
                  <button
                    className="progress-btn"
                    onClick={() =>
                      openConfirm("Start this task?", async () => {
                        setActionLoading(true);
                        await updateStatus(task._id, "In Progress");
                        setActionLoading(false);
                        showPopup("🚀 Task Started!");
                      })
                    }
                  >
                    Start
                  </button>
                )}
                {task.status === "In Progress" && (
                  <button
                    className="complete-btn"
                    onClick={() => resolveIssue(task._id)}
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>


            {task.photoId && (
              <TaskImageWithSkeleton photoId={task.photoId} />
            )}

          </div>
        ))}
      </div>
    );
  };

  /* STATS */
  const getStats = () => {
    let stats = { Assigned: 0, "In Progress": 0, Resolved: 0 };

    Object.values(tasks).forEach(arr => {
      arr.forEach(task => {
        if (STATUS.includes(task.status)) stats[task.status]++;
      });
    });

    return stats;
  };

  const stats = getStats();

  const chartData = STATUS.map(status => ({
    name: status,
    value: stats[status]
  }));

  const categoryData = Object.keys(tasks).map(cat => {
    let c = { Assigned: 0, "In Progress": 0, Resolved: 0 };

    tasks[cat].forEach(t => {
      if (STATUS.includes(t.status)) c[t.status]++;
    });

    return {
      name: cat,
      Assigned: c["Assigned"],
      Progress: c["In Progress"],
      Resolved: c["Resolved"]
    };
  });

  return (
    <div className="worker-container">

      {/* 🔔 TOAST */}
      {popup.show && <div className="popup">{popup.message}</div>}

      {/* 🔥 LOGOUT ANIMATION */}
      {logoutLoading && (
        <div className="logout-overlay">
          <div className="logout-box">
            <div className="logout-spinner"></div>
            <p>Logging out<span className="dots"></span></p>
          </div>
        </div>
      )}

      {/* CONFIRM */}
      {confirmBox.show && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>{confirmBox.message}</p>

            <div className="confirm-actions">
              <button
                className="yes-btn"
                disabled={actionLoading || logoutLoading}
                onClick={async () => {
                  setActionLoading(true);
                  await confirmBox.action();
                  setActionLoading(false);
                  closeConfirm();
                }}
              >
                {actionLoading ? "Processing..." : "Yes"}
              </button>

              <button className="no-btn" onClick={closeConfirm}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* GLOBAL LOADER (TASKS ONLY) */}
      {actionLoading && (
        <div className="global-loading">
          <div className="loader-box">⏳ Processing...</div>
        </div>
      )}

      <div className="worker-navbar">
        <h2>Worker Dashboard</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      {/* STATS */}
      <div className="stats-section">
        <h2 className="section-title highlight">📊 Task Statistics</h2>

        <div className="stats-subsection">
          <h3>Status Overview</h3>
          <div className="stats-cards">
            {loading ? (
              [1,2,3].map(i => <SkeletonBox key={i} height={50} />)
            ) : (
              <>
                <div className="stat-card assigned">Assigned<br />{stats["Assigned"]}</div>
                <div className="stat-card progress">In Progress<br />{stats["In Progress"]}</div>
                <div className="stat-card resolved">Resolved<br />{stats["Resolved"]}</div>
              </>
            )}
          </div>

          <div className="charts">
            <div className="chart-box" style={{ minHeight: "fit-content"}}>
              <h4 className="chart-title">Status Distribution (Pie Chart)</h4>
              {loading ? <SkeletonBox height={400} /> : (
                <ResponsiveContainer width="100%" minHeight={400}>
                  <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      labelLine={true}
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={8}
                    >
                      <Cell fill="#3b82f6"/>
                      <Cell fill="#6366f1"/>
                      <Cell fill="#22c55e"/>
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="chart-box">
              <h4 className="chart-title">Status Count (Bar Chart)</h4>
              {loading ? <SkeletonBox height={400} /> : (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="value" fill="#2563eb" barSize={32} radius={[8,8,0,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        <div className="stats-subsection">
          <h3>Category-wise Performance</h3>
          <div className="chart-box">
            <h4>Category Bar Chart</h4>
            {loading ? <SkeletonBox height={250} /> : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryData}>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="Assigned" fill="#3b82f6"/>
                  <Bar dataKey="Progress" fill="#6366f1"/>
                  <Bar dataKey="Resolved" fill="#22c55e"/>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* CATEGORY SELECTION */}
      <div className="category-section">
        <h2 className="section-title highlight">🗂️ Select Issue Category</h2>
        <div className="worker-cards modern-category-cards">
          <div className="worker-card modern-category-card electricity-card"
            onClick={() => setActiveCategory("electricity")}
            tabIndex={0}
            style={{ filter: activeCategory === "electricity" ? "none" : "blur(0)", outline: activeCategory === "electricity" ? "2px solid #3b82f6" : "none" }}
          >
            <div className="category-icon">⚡</div>
            <div className="category-label">Electricity</div>
            {tasks.electricity && (tasks.electricity.filter(t => t.status === "Assigned" || t.status === "In Progress").length > 0) && (
              <div className="bubble-anim inside-bubble electricity-bubble">
                {tasks.electricity.filter(t => t.status === "Assigned" || t.status === "In Progress").length}
              </div>
            )}
          </div>
          <div className="worker-card modern-category-card water-card"
            onClick={() => setActiveCategory("water")}
            tabIndex={0}
            style={{ filter: activeCategory === "water" ? "none" : "blur(0)", outline: activeCategory === "water" ? "2px solid #06b6d4" : "none" }}
          >
            <div className="category-icon">💧</div>
            <div className="category-label">Water</div>
            {tasks.water && (tasks.water.filter(t => t.status === "Assigned" || t.status === "In Progress").length > 0) && (
              <div className="bubble-anim inside-bubble water-bubble">
                {tasks.water.filter(t => t.status === "Assigned" || t.status === "In Progress").length}
              </div>
            )}
          </div>
          <div className="worker-card modern-category-card garbage-card"
            onClick={() => setActiveCategory("garbage")}
            tabIndex={0}
            style={{ filter: activeCategory === "garbage" ? "none" : "blur(0)", outline: activeCategory === "garbage" ? "2px solid #fbbf24" : "none" }}
          >
            <div className="category-icon">🗑</div>
            <div className="category-label">Garbage</div>
            {tasks.garbage && (tasks.garbage.filter(t => t.status === "Assigned" || t.status === "In Progress").length > 0) && (
              <div className="bubble-anim inside-bubble garbage-bubble">
                {tasks.garbage.filter(t => t.status === "Assigned" || t.status === "In Progress").length}
              </div>
            )}
          </div>
          <div className="worker-card modern-category-card drainage-card"
            onClick={() => setActiveCategory("drainage")}
            tabIndex={0}
            style={{ filter: activeCategory === "drainage" ? "none" : "blur(0)", outline: activeCategory === "drainage" ? "2px solid #10b981" : "none" }}
          >
            <div className="category-icon">🚰</div>
            <div className="category-label">Drainage</div>
            {tasks.drainage && (tasks.drainage.filter(t => t.status === "Assigned" || t.status === "In Progress").length > 0) && (
              <div className="bubble-anim inside-bubble drainage-bubble">
                {tasks.drainage.filter(t => t.status === "Assigned" || t.status === "In Progress").length}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="task-section">
        {activeCategory && renderTasks()}
      </div>

    </div>
  );
}