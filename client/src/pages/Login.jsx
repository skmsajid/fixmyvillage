import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "../styles/login.css";

export default function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    role: "villager",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  // 🔁 redirect if already logged
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "admin") navigate("/admin");
    else if (role === "worker") navigate("/worker");
    else if (role === "villager") navigate("/villager");
  }, [navigate]);

  const showToast = (msg, type) => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // 🔥 block multiple clicks

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || "Login failed", "error");
        setLoading(false); // only here reset
        return;
      }

      // ✅ Save session
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);

      showToast("Login Successful", "success");

      // 🔥 KEEP BUTTON BLOCKED UNTIL NAVIGATION
      setTimeout(() => {
        if (data.role === "admin") navigate("/admin");
        else if (data.role === "worker") navigate("/worker");
        else navigate("/villager");
      }, 1200);

    } catch (error) {
      console.error(error);
      showToast("Server error. Try again", "error");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* 🔙 Back */}
      <div className="back-btn" onClick={() => navigate("/")}>
        ←
      </div>

      {/* 🔔 Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="login-card">

        <h2>FixMyVillage Login</h2>
        <p className="subtitle">Access the civic issue platform</p>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="input-group">
              <label>Login As</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="villager">Villager / Civilian</option>
                <option value="worker">Worker</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group password-group">
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <span
                  className="eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </span>
              </div>
            </div>

          </div>

          {/* 🔥 BUTTON */}
          <button className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Register</Link>
        </p>

      </div>

    </div>
  );
}