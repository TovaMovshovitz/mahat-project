const CategoriesDal = require("../dal/CategoriesDal");

class CategoriesController {
  getAll = async (req, res) => {
    const categorys = await CategoriesDal.getAll();

    if (!categorys?.length) {
      return res.status(400).json({ message: "No categorys found" });
    }
    res.json(categorys);
  };

  getOne = async (req, res) => {
    const id = req.params.id;

    const ans = await CategoriesDal.getOne(id);

    if (!ans) {
      return res.status(400).json({ message: "No category found" });
    }
    res.json(ans);
  };

  create = async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newcategory = await CategoriesDal.create(name);

    if (newcategory) {
      return res
        .status(201)
        .json({ message: "New category created", data: newcategory });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid category data received" });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const ans = await CategoriesDal.update(id, name);

    if (!ans) {
      return res.status(400).json({ message: "category not found" });
    }
    res.json(ans);
  };

  deleteOne = async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "tag ID required" });
    }
    await CategoriesDal.deleteOne(id);
    res.json(`category  with ID ${id} deleted`);
  };
}

module.exports = new CategoriesController();
