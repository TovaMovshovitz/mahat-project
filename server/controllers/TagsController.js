const TagsDdal = require("../dal/TagsDal");

class TagsController {
  getAll = async (req, res) => {
    const tags = await TagsDdal.getAll();

    if (!tags?.length) {
      return res.status(400).json({ message: "No tags found" });
    }
    res.json(tags);
  };

  getOne = async (req, res) => {
    const id = req.params.id;
    const ans = await TagsDdal.getOne(id);

    if (!ans) {
      return res.status(400).json({ message: "No tag found" });
    }
    res.json(ans);
  };

  create = async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTag = await TagsDdal.create(name);

    if (newTag) {
      return res.status(201).json({ message: "New tag created", data: newTag });
    } else {
      return res.status(400).json({ message: "Invalid tag data received" });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const ans = await TagsDdal.update(id, name);

    if (!res) {
      return res.status(400).json({ message: "book not found" });
    }
    res.json(ans);
  };

  deleteOne = async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "tag ID required" });
    }
    await TagsDdal.deleteOne(id);

    res.json(`tag  with ID ${id} deleted`);
  };
}

module.exports = new TagsController();
