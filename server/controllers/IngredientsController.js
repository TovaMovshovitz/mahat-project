const IngredientsDal = require("../dal/IngredientsDal");

class IngredientsController {
  getAll = async (req, res) => {
    const ans = await IngredientsDal.getAll();

    if (!ans?.length) {
      return res.status(400).json({ message: "No ingredients found" });
    }
    res.json(ans);
  };

  getOne = async (req, res) => {
    const id = req.params.id;

    const ans = await IngredientsDal.getOne(id);

    if (!ans) {
      return res.status(400).json({ message: "No ingredient found" });
    }
    res.json(ans);
  };

  create = async (req, res) => {
    const { name, img } = req.body;
    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
    }

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
  };

  update = async (req, res) => {
    const id = req.params.id;
    const { name, img } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ans = await IngredientsDal.update(id, { name, img });
    if (!ans) {
      return res.status(400).json({ message: "ingredient not found" });
    }
    res.json0(ans);
  };

  deleteOne = async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "tag ID required" });
    }
    await IngredientsDal.deleteOne(id);

    res.json(`ingredient  with ID ${id} deleted`);
  };
}

module.exports = new IngredientsController();
