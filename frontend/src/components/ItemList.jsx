const ItemList = ({ items, onDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          {item.title} ({item.type})
          <button onClick={() => onDelete(item._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;