import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import styles from "./Navbar.module.css";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <nav className={styles.navbar}>

      <div className={styles.logo}>

        <h2>TeamSync</h2>

      </div>

      <ul className={styles.navLinks}>

        <li>

          <NavLink

            to="/"

            className={({ isActive }) =>

              isActive

                ? styles.activeLink

                : ""
            }
          >
            Home
          </NavLink>

        </li>

        <li>

          <NavLink

            to="/dashboard"

            className={({ isActive }) =>

              isActive

                ? styles.activeLink

                : ""
            }
          >
            Dashboard
          </NavLink>

        </li>

        <li>

          <NavLink

            to="/projects"

            className={({ isActive }) =>

              isActive

                ? styles.activeLink

                : ""
            }
          >
            Projects
          </NavLink>

        </li>

        <li>

          <NavLink

            to="/tasks"

            className={({ isActive }) =>

              isActive

                ? styles.activeLink

                : ""
            }
          >
            Tasks
          </NavLink>

        </li>

        {
          token ? (

            <>

              <li className={styles.profileSection}>

                <div className={styles.avatar}>

                  {
                    user?.name
                      ?.charAt(0)
                      ?.toUpperCase()
                  }

                </div>

                <span>
                  {user?.name}
                </span>

              </li>

              <li>

                <button
                  className={styles.logoutBtn}
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </li>

            </>

          ) : (

            <li>

              <NavLink
                to="/login"
                className={styles.loginBtn}
              >
                Login
              </NavLink>

            </li>
          )
        }

      </ul>

    </nav>
  );
}

export default Navbar;