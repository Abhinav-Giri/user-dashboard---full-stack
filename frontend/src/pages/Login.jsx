import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handlers
  const handleEmailChange = (e) => {
    setForm((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setForm((prev) => ({ ...prev, password: e.target.value }));
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Validation
  const validate = () => {
    console.log("email", form.email);
    if (!form.email.includes("@")) return "Invalid email format";
    if (!form.password.trim()) return "Password is required";
    return "";
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", form);

      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleEmailChange}
            />
          </div>

          {/* Password with toggle */}
          <div className={`${styles.inputGroup} ${styles.passwordWrapper}`}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={form.password}
              onChange={handlePasswordChange}
            />
            <span className={styles.toggle} onClick={togglePassword}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Button */}
          <button
            className={`${styles.button} ${
              loading ? styles.buttonDisabled : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? <div className={styles.spinner}></div> : "Login"}
          </button>
          <p style={{ marginTop: "10px", textAlign: "center" }}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          {/* Error */}
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
