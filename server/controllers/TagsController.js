const TagsDdal = require("../dal/TagsDal");

class TagsController {
  getAll = async (req, res, next) => {
    try {
      const tags = await TagsDdal.getAll();

      if (!tags?.length) {
        return res.status(400).json({ message: "No tags found" });
      }
      res.json(tags);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req, res, next) => {
    const id = req.params.id;
    try {
      const ans = await TagsDdal.getOne(id);

      if (!ans) {
        return res.status(400).json({ message: "No tag found" });
      }
      res.json(ans);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const newTag = await TagsDdal.create(name);

      if (newTag) {
        return res
          .status(201)
          .json({ message: "New tag created", data: newTag });
      } else {
        return res.status(400).json({ message: "Invalid tag data received" });
      }
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    const id = req.params.id;
    const { name } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      const ans = await TagsDdal.update(id, name);

      if (!res) {
        return res.status(400).json({ message: "book not found" });
      }
      res.json(ans);
    } catch (error) {
      next(error);
    }
  };

  deleteOne = async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "tag ID required" });
    }
    try {
      await TagsDdal.deleteOne(id);

      res.json(`tag  with ID ${id} deleted`);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new TagsController();
