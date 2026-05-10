import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import styles from "./Projects.module.css";

function Projects() {

  const [projects, setProjects] = useState([]);

  const [tasks, setTasks] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const user = JSON.parse(
  localStorage.getItem("user")
);

  useEffect(() => {

    fetchProjects();

    fetchTasks();

  }, []);

  const fetchProjects = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(

        "http://localhost:5000/api/projects",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(response.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load projects");
    }
  };

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(

        "http://localhost:5000/api/tasks",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load tasks");
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createProject = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(

        "http://localhost:5000/api/projects",

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      fetchProjects();

      setShowForm(false);

      setFormData({
        title: "",
        description: "",
        status: "Pending",
      });

    } catch (error) {

      console.log(error);

      toast.error("Failed to create project");
    }
  };

  const deleteProject = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(

        `http://localhost:5000/api/projects/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(

        projects.filter(
          (project) => project._id !== id
        )
      );

      toast.success("Project deleted");

    } catch (error) {

      console.log(error);

      toast.error("Failed to delete project");
    }
  };

  return (

    <div className={styles.projectsContainer}>

      <div className={styles.topSection}>

        <h1>Projects</h1>

        <button
          onClick={() => setShowForm(!showForm)}
        >
          + Create Project
        </button>

      </div>

      {
        showForm && (

          <form
            className={styles.projectForm}
            onSubmit={createProject}
          >

            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >

              <option>Pending</option>

              <option>In Progress</option>

              <option>Completed</option>

            </select>

            <button type="submit">
              Save Project
            </button>

          </form>
        )
      }

      <div className={styles.projectGrid}>

        {
          projects.map((project) => {

            const projectTasks = tasks.filter(

              (task) =>

                task.project?._id === project._id ||

                task.project === project._id
            );

            const completedTasks = projectTasks.filter(

              (task) =>

                task.status === "Completed"
            );

            const progress =

              projectTasks.length > 0

                ? (completedTasks.length / projectTasks.length) * 100

                : 0;

            return (

              <div
                className={styles.projectCard}
                key={project._id}
              >

                <h2>{project.title}</h2>

                <p>{project.description}</p>

                <div className={styles.projectInfo}>

                  <span>
                    {projectTasks.length} Tasks
                  </span>

                  <span>
                    {completedTasks.length} Completed
                  </span>

                </div>

                <div className={styles.progressBar}>

                  <div
                    className={styles.progress}

                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>

                </div>

                <p className={styles.progressText}>
                  {Math.round(progress)}% Completed
                </p>

                <div className={styles.membersSection}>

                  <h4>Team Members</h4>

                  {
                    project.members?.length > 0 ? (

                      project.members.map((member) => (

                        <p key={member._id}>
                          👤 {member.name}
                        </p>
                      ))

                    ) : (

                      <p>No members added</p>
                    )
                  }

                </div>

                <div className={styles.bottomSection}>

                  <span>
                    {project.status}
                  </span>

                  {
                    user?.role === "admin" && (

                      <button
                        className={styles.deleteBtn}
                        onClick={() => deleteProject(project._id)}
                      >
                        Delete
                      </button>
                    )
                  }

                </div>

              </div>
            );
          })
        }

      </div>

    </div>
  );
}

export default Projects;