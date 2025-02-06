import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../api/BooksApi";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [user, setUser] = useState({ name: "", pass: "" });
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const { token } = await registerUser({
        username: user.name,
        password: user.pass,
      }).unwrap();
      localStorage.setItem("token", token);
      alert("Account created!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <form onSubmit={submitForm}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            className={styles.input}
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            value={user.pass}
            onChange={(e) => setUser({ ...user, pass: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;