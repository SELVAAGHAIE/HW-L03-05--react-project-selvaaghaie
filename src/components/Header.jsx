import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/" className={styles.logo}>MyBooks</Link>
      </div>
      <nav className={styles.nav}>
        {!token ? (
          <>
            <Link to="/register" className={styles.navLink}>Sign Up</Link>
            <Link to="/login" className={styles.navLink}>Sign In</Link>
          </>
        ) : (
          <>
            <Link to="/" className={styles.navLink}>Library</Link>
            <Link to="/create" className={styles.navLink}>New Book</Link>
            <button onClick={logoutUser} className={styles.button}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;