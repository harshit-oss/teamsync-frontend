import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./Register.module.css";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {

      alert("Passwords do not match");

      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",

        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      toast.success(response.data.message);

    } catch (error) {

      toast.error(error.response.data.message);
    }
  };

  return (
    <div className={styles.wrapper}>

      <div className={styles.registerBox}>

        <div className={styles.header}>

          <img
            src="/TeamSync Logo.png"
            alt="TeamSync Logo"
            className={styles.logo}
          />

          <h1>Create Account</h1>

          <p>
            Join TeamSync to manage projects and teams
          </p>

        </div>

        <form
          className={styles.formSection}
          onSubmit={handleSubmit}
        >

          <div className={styles.inputGroup}>
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={handleChange}
            />
          </div>

          <button type="submit">
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;