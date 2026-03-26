import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css"; // reuse same CSS

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.includes("@")) return "Invalid email";
    if (!form.password.trim()) return "Password required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) return setError(err);

    try {
      await registerUser(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            placeholder="Name"
            onChange={handleChange("name")}
          />

          <input
            className={styles.input}
            placeholder="Email"
            onChange={handleChange("email")}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            onChange={handleChange("password")}
          />

          <button className={styles.button}>Register</button>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
