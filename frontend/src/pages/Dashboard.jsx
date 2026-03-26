import { useEffect, useState, useContext } from "react";
import {
  getItems,
  createItem,
  deleteItem,
  updateItem,
} from "../api/dashboardApi";
import { AuthContext } from "../context/AuthContext";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("task");
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getItems(token);
        setItems(res.data);
      } catch (err) {
        console.log("Error", err.message);
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  // Add / Update
  const handleSubmit = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);

      if (editId) {
        await updateItem(editId, { title, type }, token);
        setEditId(null);
      } else {
        await createItem({ title, type }, token);
      }

      setTitle("");

      // Refresh list
      const res = await getItems(token);
      setItems(res.data);
    } catch (err) {
      console.log("Error", err.message);
      setError("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  //  Edit
  const handleEdit = (item) => {
    setTitle(item.title);
    setType(item.type);
    setEditId(item._id);
  };

  //  Delete
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteItem(id, token);

      // Optimistic update
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log("Error", err.message);
      setError("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  //  Logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Welcome {user?.name}</h2>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Card */}
      <div className={styles.card}>
        {/* Form */}
        <div className={styles.formRow}>
          <input
            className={styles.input}
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="task">Task</option>
            <option value="lead">Lead</option>
            <option value="user">User</option>
          </select>

          <button className={styles.addBtn} onClick={handleSubmit}>
            {loading ? "..." : editId ? "Update" : "Add"}
          </button>
        </div>

        {/* Loading */}
        {loading && <p>Loading...</p>}

        {/* List */}
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item._id} className={styles.item}>
              <span>
                {item.title} ({item.type})
              </span>

              <div className={styles.actions}>
                <button
                  className={styles.editBtn}
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>

                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
