import { useState, useEffect } from "react";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";



export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  const [activeMenu, setActiveMenu] = useState("requests");
  const [requests, setRequests] = useState([]);

  // Fetch pending requests
  useEffect(() => {

    fetch("http://localhost:5000/api/admin/requests")
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.log(err));

  }, []);


  // Approve user
  const approveUser = async (id) => {

    try {

      await fetch(`http://localhost:5000/api/admin/approve/${id}`, {
        method: "PUT"
      });

      alert("User Approved");

      setRequests(requests.filter(user => user._id !== id));

    } catch (error) {

      console.log(error);

    }

  };


  // Reject user
  const rejectUser = async (id) => {

    try {

      await fetch(`http://localhost:5000/api/admin/reject/${id}`, {
        method: "PUT"
      });

      alert("User Rejected");

      setRequests(requests.filter(user => user._id !== id));

    } catch (error) {

      console.log(error);

    }

  };


  const renderContent = () => {

    if (activeMenu === "requests") {

      return (

        <div>

          <h2 className="section-title">Registration Requests</h2>

          <div className="table-container">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Aadhaar</th>
                  <th>Approve</th>
                  <th>Reject</th>
                </tr>
              </thead>

              <tbody>

                {requests.length === 0 ? (

                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No pending requests
                    </td>
                  </tr>

                ) : (

                  requests.map((user) => (

                    <tr key={user._id}>

                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.aadhar}</td>

                      <td>
                        <button
                          className="approve-btn"
                          onClick={() => approveUser(user._id)}
                        >
                          Approve
                        </button>
                      </td>

                      <td>
                        <button
                          className="reject-btn"
                          onClick={() => rejectUser(user._id)}
                        >
                          Reject
                        </button>
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      );

    }


    if (activeMenu === "issues") {
      return <h2 className="section-title">Issue Reports</h2>;
    }

    if (activeMenu === "assign") {
      return <h2 className="section-title">Assign Worker</h2>;
    }

    if (activeMenu === "villagers") {
      return <h2 className="section-title">Villagers List</h2>;
    }

    if (activeMenu === "workers") {
      return <h2 className="section-title">Workers List</h2>;
    }

  };


  return (

    <div className="admin-layout">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h2 className="logo">FixMyVillage</h2>
        <button className="logout-btn" onClick={logout}>
  Logout
</button>

        <ul>

          <li
            className={activeMenu === "requests" ? "active" : ""}
            onClick={() => setActiveMenu("requests")}
          >
            Registration Requests
          </li>

          <li
            className={activeMenu === "issues" ? "active" : ""}
            onClick={() => setActiveMenu("issues")}
          >
            Issue Reports
          </li>

          <li
            className={activeMenu === "assign" ? "active" : ""}
            onClick={() => setActiveMenu("assign")}
          >
            Assign Worker
          </li>

          <li
            className={activeMenu === "villagers" ? "active" : ""}
            onClick={() => setActiveMenu("villagers")}
          >
            Villagers List
          </li>

          <li
            className={activeMenu === "workers" ? "active" : ""}
            onClick={() => setActiveMenu("workers")}
          >
            Workers List
          </li>

        </ul>

      </div>


      {/* MAIN CONTENT */}

      <div className="admin-content">

        <div className="admin-header">
          <h1>Admin Dashboard</h1>
        </div>

        <div className="content-area">

          {renderContent()}

        </div>

      </div>

    </div>

  );
}