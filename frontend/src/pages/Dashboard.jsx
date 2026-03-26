import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [data, setData] = useState({});
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await api.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(res.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Welcome {user?.name}</h2>
      <button onClick={logout}>Logout</button>

      <h3>Leads</h3>
      <ul>{data.leads?.map((l, i) => <li key={i}>{l}</li>)}</ul>

      <h3>Tasks</h3>
      <ul>{data.tasks?.map((t, i) => <li key={i}>{t}</li>)}</ul>

      <h3>Users</h3>
      <ul>{data.users?.map((u, i) => <li key={i}>{u}</li>)}</ul>
    </div>
  );
};

export default Dashboard;