import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginUserMutation } from "../api/BooksApi";
import styles from "./SingIn.module.css";

const SignIn = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [authenticate, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await authenticate({
        username: user,
        password: pass,
      }).unwrap();
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch {
      alert("Login failed. Try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            className={styles.input}
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;