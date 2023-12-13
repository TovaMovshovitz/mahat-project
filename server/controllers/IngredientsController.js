const IngredientsDal = require("../dal/IngredientsDal");

class IngredientsController {
  getAll = async (req, res, next) => {
    try {
      const ans = await IngredientsDal.getAll();

      if (!ans?.length) {
        return res.status(400).json({ message: "No ingredients found" });
      }
      res.json(ans);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req, res, next) => {
    const id = req.params.id;
    try {
      const ans = await IngredientsDal.getOne(id);

      if (!ans) {
        return res.status(400).json({ message: "No ingredient found" });
      }
      res.json(ans);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    const { name, img } = req.body;
    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const newIngredient = await IngredientsDal.create({ name, img });

      if (newIngredient) {
        return res
          .status(201)
          .json({ message: "New ingredient created", data: newIngredient });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid ingredient data received" });
      }
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    const id = req.params.id;
    const { name, img } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const ans = await IngredientsDal.update(id, { name, img });
      if (!ans) {
        return res.status(400).json({ message: "ingredient not found" });
      }
      res.json0(ans);
    } catch (error) {
      next(error);
    }
  };

  deleteOne = async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ingredient ID required" });
    }
    try {
      await IngredientsDal.deleteOne(id);

      res.json(`ingredient  with ID ${id} deleted`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = new IngredientsController();
