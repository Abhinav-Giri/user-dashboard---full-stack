exports.getDashboard = (req, res) => {
  res.json({
    leads: ["Lead 1", "Lead 2"],
    tasks: ["Task 1", "Task 2"],
    users: ["User A", "User B"],
  });
};