const MeasuringUtensilsDal = require("../dal/MeasuringUtensilsDal");

class MeasuringUtensilsController {
  getAll = async (req, res, next) => {
    try {
      const ans = await MeasuringUtensilsDal.getAll();

      if (!ans?.length) {
        return res.status(400).json({ message: "No measuringUtensils found" });
      }
      res.json(ans);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req, res, next) => {
    const id = req.params.id;
    try {
      const ans = await MeasuringUtensilsDal.getOne(id);

      if (!ans) {
        return res.status(400).json({ message: "No measuringUtensil found" });
      }
      res.json(ans);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    const { name, plural } = req.body;
    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
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
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    const id = req.params.id;
    const { name, plural } = req.body;

    if (!id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      const ans = await MeasuringUtensilsDal.update(id, { name, plural });

      if (!ans) {
        return res.status(400).json({ message: "measuringUtensil not found" });
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
      await MeasuringUtensilsDal.deleteOne(id);

      res.json(`measuringUtensil  with ID ${id} deleted`);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new MeasuringUtensilsController();
