import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import styles from "./Login.module.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",

        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success(response.data.message);

      navigate("/dashboard");

    } catch (error) {

      toast.error(error.response.data.message);
    }
  };

  return (
    <div className={styles.wrapper}>

      <div className={styles.loginBox}>

        <div className={styles.header}>

          <img
            src="/TeamSync Logo.png"
            alt="TeamSync Logo"
            className={styles.logo}
          />

          <h1>TeamSync</h1>

          <p>
            Manage your team and tasks efficiently
          </p>

        </div>

        <form
          className={styles.formSection}
          onSubmit={handleSubmit}
        >

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
              placeholder="Enter your password"
              onChange={handleChange}
            />

          </div>

          <button type="submit">
            Sign In
          </button>

        </form>

        <div className={styles.bottomText}>
          <p>
            New user?{" "}

            <span
              className={styles.registerLink}

              onClick={() => navigate("/register")}
            >
              Create Account
            </span>

          </p>
        </div>

      </div>

    </div>
  );
}

export default Login;