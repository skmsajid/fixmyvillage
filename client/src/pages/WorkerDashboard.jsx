import { useState } from "react";
import "../styles/worker.css";
import { useNavigate } from "react-router-dom";
export default function WorkerDashboard(){
    const navigate = useNavigate();

    const logout = () => {

    localStorage.clear();

    navigate("/");

    };

  const [tasks, setTasks] = useState([
    {
      id:1,
      issue:"Broken Street Light",
      location:"Main Road",
      status:"Assigned"
    },
    {
      id:2,
      issue:"Drainage Block",
      location:"Market Area",
      status:"Assigned"
    }
  ]);


  const completeTask = (id)=>{
    setTasks(tasks.map(task =>
      task.id === id ? {...task, status:"Completed"} : task
    ));
  };


  return(

    <div className="worker-container">

      <h1 className="dashboard-title">Worker Dashboard</h1>
    <button className="logout-btn" onClick={logout}>
  Logout
</button>
      <div className="table-box">

        <h2>Assigned Tasks</h2>

        <table className="issue-table">

          <thead>
            <tr>
              <th>Issue</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {tasks.map(task => (

              <tr key={task.id}>

                <td>{task.issue}</td>
                <td>{task.location}</td>
                <td>{task.status}</td>

                <td>

                  {task.status !== "Completed" && (
                    <button
                      className="complete-btn"
                      onClick={()=>completeTask(task.id)}
                    >
                      Mark Complete
                    </button>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}