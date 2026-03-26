const Item = require("../models/Item");

// CREATE
exports.createItem = async (req, res) => {
  try {
    const { title, type } = req.body;

    const item = await Item.create({
      title,
      type,
      createdBy: req.user._id,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Create failed" });
  }
};

// READ ALL
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ createdBy: req.user._id });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
};

// UPDATE
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Not found" });

    item.title = req.body.title || item.title;
    item.type = req.body.type || item.type;

    const updated = await item.save();

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Not found" });

    await item.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};