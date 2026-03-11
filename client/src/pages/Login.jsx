import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "villager",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

    // ⭐ Redirect if already logged in
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

  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

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
        alert(data.message || "Login failed");
        return;
      }

      // ⭐ Save user session
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);

      alert("Login Successful");


      // Role Based Navigation

      if (data.role === "admin") {
        navigate("/admin");
      }

      else if (data.role === "worker") {
        navigate("/worker");
      }

      else {
        navigate("/villager");
      }

    } catch (error) {

      console.error(error);
      alert("Server error. Please try again.");

    }

  };


  return (
    <div className="login-container">

      <div className="login-card">

        <h2>FixMyVillage Login</h2>
        <p className="subtitle">Access the civic issue platform</p>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* ROLE SELECT */}
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


            {/* EMAIL */}
            <div className="input-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>


            {/* PASSWORD */}
            <div className="input-group password-group">
              <label>Password</label>

              <div className="password-wrapper">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
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


          {/* LOGIN BUTTON */}
          <button className="login-btn">
            Login
          </button>

        </form>


        {/* SIGNUP NAVIGATION */}
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Register</Link>
        </p>

      </div>

    </div>
  );
}