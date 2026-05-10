import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.homeContainer}>

      <div className={styles.heroSection}>

        <img
          src="/TeamSync Logo.png"
          alt="TeamSync Logo"
          className={styles.logo}
        />

        <h1>
          Organize Teams & Manage Tasks Efficiently
        </h1>

        <p>
          TeamSync helps teams manage projects, assign tasks,
          and track progress in one place.
        </p>

        <div className={styles.buttonGroup}>

          <Link to="/register">
            <button className={styles.registerBtn}>
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button className={styles.loginBtn}>
              Login
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;