import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "../styles/signup.css";

export default function Signup() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    aadhar: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 🔁 redirect if logged in
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") navigate("/admin");
    else if (role === "worker") navigate("/worker");
    else if (role === "villager") navigate("/villager");
  }, [navigate]);

  // 🔔 toast helper
  const showToast = (msg, type) => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 🔥 Aadhaar formatter (XXXX XXXX XXXX)
  const formatAadhar = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 12);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  // ✏️ input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "aadhar") {
      const formatted = formatAadhar(value);
      setFormData({
        ...formData,
        aadhar: formatted
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 🚀 submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const rawAadhar = formData.aadhar.replace(/\s/g, "");

    // 🔒 validation
    if (rawAadhar.length !== 12) {
      showToast("Aadhaar must be exactly 12 digits", "error");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match", "error");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          ...formData,
          aadhar: rawAadhar // send clean digits
        })
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message, "error");
        setLoading(false);
        return;
      }

      showToast("Registration request is sent to Admin and Wait for Admin Approval", "success");
      setTimeout(() => navigate("/login"), 1500);

    } catch {
      showToast("Server error", "error");
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">

      {/* 🔙 Back */}
      <div className="back-btn" onClick={() => navigate("/")}>←</div>

      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="signup-card">

        <h2>FixMyVillage Registration</h2>
        <p className="subtitle">Register to report village issues</p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <div className="input-group">
              <label>Full Name</label>
              <input name="name" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" onChange={handleChange} required />
            </div>

            {/* 🔥 Aadhaar */}
            <div className="input-group">
              <label>Aadhaar Number</label>
              <input
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX"
                required
              />
            </div>

            <div className="input-group password-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  required
                />
                <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁"}
                </span>
              </div>
            </div>

            <div className="input-group password-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleChange}
                  required
                />
                <span className="eye" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? "🙈" : "👁"}
                </span>
              </div>
            </div>

          </div>

          <button className="signup-btn" disabled={loading}>
            {loading ? "Processing..." : "Register"}
          </button>

        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}