const StepsDal = require("../dal/StepsDal");

class StepsController {
  getOne = async (req, res) => {
    const userId = 1//req.user.id;
    const id = req.params.id;
    const ans = await StepsDal.getOne(userId);

    if (!ans) {
      return res.status(400).json({ message: "No step found" });
    }
    res.json(ans);
  };

  create = async (req, res) => {
    const { direction, number, recipeId } = req.body;
    if (!direction || !number || !recipeId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newStep = await StepsDal.create({ direction, number, recipeId });

    if (newStep) {
      return res
        .status(201)
        .json({ message: "New step created", data: newStep });
    } else {
      return res.status(400).json({ message: "Invalid step data received" });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    const { direction, number, recipeId } = req.body;

    if (!direction || !number || !recipeId || !id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const ans = await StepsDal.update(id, { direction, number, recipeId });

    if (!ans) {
      return res.status(400).json({ message: "step not found" });
    }
    res.json(ans);
  };

  deleteOne = async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID required" });
    }
    await StepsDal.deleteOne(id);

    res.json(`step  with ID ${id} deleted`);
  };
}

module.exports = new StepsController();
