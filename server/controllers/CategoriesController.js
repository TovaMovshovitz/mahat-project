const CategoriesDal = require("../dal/CategoriesDal");

class CategoriesController {
  getAll = async (req, res, next) => {
    try {
      const categorys = await CategoriesDal.getAll();

      if (!categorys?.length) {
        return res.status(400).json({ message: "No categorys found" });
      }
      res.json(categorys);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req, res, next) => {
    const id = req.params.id;

    try {
      const ans = await CategoriesDal.getOne(id);

      if (!ans) {
        return res.status(400).json({ message: "No category found" });
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
      const ans = await CategoriesDal.update(id, name);

      if (!ans) {
        return res.status(400).json({ message: "category not found" });
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
      await CategoriesDal.deleteOne(id);
      res.json(`category  with ID ${id} deleted`);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CategoriesController();
