import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";

export default function Signup() {

  const navigate = useNavigate();   // ⭐ define navigate

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    aadhar: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  // Redirect if already logged in
  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role === "admin") {
      navigate("/admin");
    }
    else if (role === "worker") {
      navigate("/worker");
    }
    else if (role === "villager") {
      navigate("/villager");
    }

  }, [navigate]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const res = await fetch("http://localhost:5000/api/auth/signup", {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          aadhar: formData.aadhar,
          password: formData.password
        })

      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Signup request sent to admin");

      navigate("/login");  // optional redirect after signup

    }
    catch (err) {

      console.error(err);
      alert("Server error");

    }

  };


  return (
    <div className="signup-container">

      <div className="signup-card">

        <h2>FixMyVillage Registration</h2>
        <p className="subtitle">Register to report village issues</p>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* Full Name */}
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
            </div>

            {/* Aadhaar */}
            <div className="input-group">
              <label>Aadhaar Number</label>
              <input
                type="text"
                name="aadhar"
                placeholder="12 digit Aadhaar"
                maxLength="12"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="input-group password-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  onChange={handleChange}
                  required
                />
                <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁"}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="input-group password-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  onChange={handleChange}
                  required
                />
                <span className="eye" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? "🙈" : "👁"}
                </span>
              </div>
            </div>

          </div>

          <button className="signup-btn">Register</button>

        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
}