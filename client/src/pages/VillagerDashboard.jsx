import { useState } from "react";
import "../styles/villager.css";
import { useNavigate } from "react-router-dom";



export default function VillagerDashboard(){
    const navigate = useNavigate();

const logout = () => {

localStorage.clear();

navigate("/");

};

  const [issues, setIssues] = useState([
    {
      id:1,
      title:"Broken Street Light",
      location:"Main Road",
      status:"Pending"
    },
    {
      id:2,
      title:"Water Leakage",
      location:"Village Center",
      status:"In Progress"
    }
  ]);

  return (

    <div className="villager-container">

      <h1 className="dashboard-title">Villager Dashboard</h1>
      <button className="logout-btn" onClick={logout}>
        Logout
        </button>

      {/* REPORT ISSUE */}

      <div className="report-box">

        <h2>Report New Issue</h2>

        <input placeholder="Issue Title" />
        <input placeholder="Location" />
        <textarea placeholder="Describe the issue"></textarea>

        <button className="report-btn">Submit Issue</button>

      </div>


      {/* MY COMPLAINTS */}

      <div className="table-box">

        <h2>My Complaints</h2>

        <table className="issue-table">

          <thead>
            <tr>
              <th>Issue</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {issues.map(issue => (
              <tr key={issue.id}>
                <td>{issue.title}</td>
                <td>{issue.location}</td>
                <td className="status">{issue.status}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}