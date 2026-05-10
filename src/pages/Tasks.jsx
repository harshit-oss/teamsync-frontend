import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import styles from "./Tasks.module.css";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [projects, setProjects] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({

    title: "",
    description: "",
    status: "Pending",
    assignedTo: "",
    dueDate: "",
    project: "",
  });

  useEffect(() => {

    fetchTasks();

    fetchProjects();

  }, []);

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/tasks`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchProjects = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/projects`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const createTask = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/tasks`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      fetchTasks();

      setShowForm(false);

      setFormData({

        title: "",
        description: "",
        status: "Pending",
        assignedTo: "",
        dueDate: "",
        project: "",
      });

    } catch (error) {

      console.log(error);

      toast.error("Failed to create task");
    }
  };

  const deleteTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(

        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(

        tasks.filter(
          (task) => task._id !== id
        )
      );

      toast.success("Task deleted");

    } catch (error) {

      console.log(error);

      toast.error("Failed to delete task");
    }
  };

  const updateTaskStatus = async (id, status) => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.put(

        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,

        { status },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(

        tasks.map((task) =>

          task._id === id

            ? response.data.task

            : task
        )
      );

      toast.success("Task updated");

    } catch (error) {

      console.log(error);

      toast.error("Failed to update task");
    }
  };

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =

      task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =

      statusFilter === "All"

        ? true

        : task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (

    <div className={styles.tasksContainer}>

      <div className={styles.topSection}>

        <h1>Tasks</h1>

        <button
          onClick={() => setShowForm(!showForm)}
        >
          + Add Task
        </button>

      </div>

      {
        showForm && (

          <form
            className={styles.taskForm}
            onSubmit={createTask}
          >

            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleChange}
            />

            <input
              type="text"
              name="assignedTo"
              placeholder="Assigned To"
              value={formData.assignedTo}
              onChange={handleChange}
            />

            <input
              type="text"
              name="dueDate"
              placeholder="Due Date"
              value={formData.dueDate}
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

            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
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
              Save Task
            </button>

          </form>
        )
      }

      <div className={styles.filterSection}>

        <input
          type="text"
          placeholder="Search Tasks..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >

          <option>All</option>

          <option>Pending</option>

          <option>In Progress</option>

          <option>Completed</option>

        </select>

      </div>

      <div className={styles.taskGrid}>

        {
          filteredTasks.map((task) => (

            <div

              className={`${styles.taskCard}

              ${

                task.status !== "Completed" &&

                new Date(task.dueDate) < new Date()

                  ? styles.overdueTask

                  : ""
              }`}

              key={task._id}
          >

              <div className={styles.cardTop}>

                <h2>{task.title}</h2>

                <select
                  value={task.status}

                  onChange={(e) =>

                    updateTaskStatus(
                      task._id,
                      e.target.value
                    )
                  }

                  className={styles.statusSelect}
                >

                  <option>Pending</option>

                  <option>In Progress</option>

                  <option>Completed</option>

                </select>

              </div>

              <p>{task.description}</p>

              <div className={styles.taskInfo}>

                <span>
                  Assigned: {task.assignedTo}
                </span>

                <span>
                  Due: {task.dueDate}
                </span>

              </div>

              <div className={styles.taskBottom}>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>

                  <p>
                    Project: {task.project?.title}
                  </p>

                </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default Tasks;