import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import styles from "./Dashboard.module.css";

function Dashboard() {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [tasks, setTasks] = useState([]);

  const [showInviteForm, setShowInviteForm] = useState(false);

  const [inviteData, setInviteData] = useState({
    email: "",
    projectId: "",
  });

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      const token = localStorage.getItem("token");

      const projectResponse = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/projects`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const taskResponse = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/tasks`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(projectResponse.data);

      setTasks(taskResponse.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load dashboard");
    }
  };

  const handleInviteChange = (e) => {

    setInviteData({

      ...inviteData,

      [e.target.name]: e.target.value,
    });
  };

  const inviteMember = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/team/invite`,

        inviteData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      setShowInviteForm(false);

      setInviteData({
        email: "",
        projectId: "",
      });

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to invite member"
      );
    }
  };

  const completedTasks = tasks.filter(

    (task) => task.status === "Completed"
  );

  const pendingTasks = tasks.filter(

    (task) => task.status === "Pending"
  );

  const inProgressTasks = tasks.filter(

    (task) => task.status === "In Progress"
  );

  const overdueTasks = tasks.filter((task) => {

  return (

    task.status !== "Completed" &&

    new Date(task.dueDate) < new Date()
  );
});

  return (

    <div className={styles.dashboardContainer}>

      <div className={styles.welcomeSection}>

        <h1>Welcome Back 👋</h1>

        <p>
          Here’s an overview of your team activity and project progress.
        </p>

      </div>

      <div className={styles.cardSection}>

        <div className={styles.card}>

          <h2>{tasks.length}</h2>

          <p>Total Tasks</p>

        </div>

        <div className={styles.card}>

          <h2>{completedTasks.length}</h2>

          <p>Completed</p>

        </div>

        <div className={styles.card}>

          <h2>{pendingTasks.length}</h2>

          <p>Pending</p>

        </div>

        <div className={styles.card}>

          <h2>{overdueTasks.length}</h2>

          <p>Overdue</p>

          

        </div>

      </div>

      <div className={styles.actionSection}>

        <button
          onClick={() => navigate("/projects")}
        >
          Create Project
        </button>

        <button
          onClick={() => navigate("/tasks")}
        >
          Add Task
        </button>

        <button
          onClick={() =>
            setShowInviteForm(!showInviteForm)
          }
        >
          Invite Team
        </button>

      </div>

      {
        showInviteForm && (

          <form
            className={styles.inviteForm}
            onSubmit={inviteMember}
          >

            <input
              type="email"
              name="email"
              placeholder="Enter member email"
              value={inviteData.email}
              onChange={handleInviteChange}
            />

            <select
              name="projectId"
              value={inviteData.projectId}
              onChange={handleInviteChange}
            >

              <option value="">
                Select Project
              </option>

              {
                projects.map((project) => (

                  <option
                    key={project._id}
                    value={project._id}
                  >

                    {project.title}

                  </option>
                ))
              }

            </select>

            <button type="submit">
              Send Invite
            </button>

          </form>
        )
      }

      <div className={styles.bottomSection}>

        <div className={styles.taskTable}>

          <h2>Recent Tasks</h2>

          <table>

            <thead>

              <tr>

                <th>Task</th>

                <th>Status</th>

                <th>Due Date</th>

              </tr>

            </thead>

            <tbody>

              {
                tasks.slice(0, 5).map((task) => (

                  <tr key={task._id}>

                    <td>{task.title}</td>

                    <td>{task.status}</td>

                    <td>{task.dueDate}</td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

        <div className={styles.progressSection}>

          <h2>Project Progress</h2>

          {
            projects.map((project) => {

              const projectTasks = tasks.filter(

                (task) =>

                  task.project === project._id ||

                  task.project?._id === project._id
              );

              const completed = projectTasks.filter(

                (task) =>

                  task.status === "Completed"
              );

              const progress =

                projectTasks.length > 0

                  ? (completed.length / projectTasks.length) * 100

                  : 0;

              return (

                <div
                  className={styles.progressItem}
                  key={project._id}
                >

                  <p>
                    {project.title}
                  </p>

                  <div className={styles.progressBar}>

                    <div
                      className={styles.progressFill}

                      style={{
                        width: `${progress}%`,
                      }}
                    ></div>

                  </div>

                  <span>
                    {Math.round(progress)}% Completed
                  </span>

                </div>
              );
            })
          }

        </div>

      </div>

    </div>
  );
}

export default Dashboard;