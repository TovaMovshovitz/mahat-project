const MeasuringUtensilsDal = require("../dal/MeasuringUtensilsDal");

class MeasuringUtensilsController {
  getAll = async (req, res) => {
    const ans = await MeasuringUtensilsDal.getAll();

    if (!ans?.length) {
      return res.status(400).json({ message: "No measuringUtensils found" });
    }
    res.json(ans);
  };

  getOne = async (req, res) => {
    const id = req.params.id;
    const ans = await MeasuringUtensilsDal.getOne(id);

    if (!ans) {
      return res.status(400).json({ message: "No measuringUtensil found" });
    }
    res.json(ans);
  };

  create = async (req, res) => {
    const { name, plural } = req.body;
    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMeasuringUtensil = await MeasuringUtensilsDal.create({
      name,
      plural,
    });

    if (newMeasuringUtensil) {
      return res.status(201).json({
        message: "New measuringUtensil created",
        data: newMeasuringUtensil,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid measuringUtensil data received" });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    const { name, plural } = req.body;

    if (!id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const ans = await MeasuringUtensilsDal.update(id, { name, plural });

    if (!ans) {
      return res.status(400).json({ message: "measuringUtensil not found" });
    }
    res.json(ans);
  };

  deleteOne = async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "tag ID required" });
    }
    await MeasuringUtensilsDal.deleteOne(id);

    res.json(`measuringUtensil  with ID ${id} deleted`);
  };
}

module.exports = new MeasuringUtensilsController();
