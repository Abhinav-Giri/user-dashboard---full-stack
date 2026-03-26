const ItemForm = ({ title, setTitle, type, setType, onAdd }) => {
  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="task">Task</option>
        <option value="lead">Lead</option>
        <option value="user">User</option>
      </select>

      <button onClick={onAdd}>Add</button>
    </div>
  );
};

export default ItemForm;