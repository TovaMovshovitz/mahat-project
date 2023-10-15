const db = require("../models/index");
const { sequelize } = require("sequelize");

const measuringUtensil = db.measuringUtensil;
const ingredient = db.ingredient;
const recipeIngredient = db.recipeIngredient;
const RecipesDal = require("../dal/RecipesDal");
const { Op } = require("sequelize");

class RecipesController {
  getAll = async (req, res) => {
    const userId = 1; //req.user.id;
    const ans = await RecipesDal.getAll(userId);

    if (!ans?.length) {
      return res.status(400).json({ message: "No recipes found" });
    }
    res.json(ans);
  };
  genareteCleanRecipe = (singleRecipe) => {
    const cleanIngridients = singleRecipe.recipeIngredients.map((i) => ({
      ingredientId: i.ingredientId,
      ingredientName: i.ingredient.name,
      ingredientImg: i.ingredient.img,
      measuringUtensilName: i.measuringUtensil?.name,
      measuringUtensilId: i.measuringUtensilId,
      qty: i.qty,
      meta: i.meta,
    }));

    return {
      id: singleRecipe.id,
      name: singleRecipe.name,
      description: singleRecipe.description,
      img: singleRecipe.img,
      preperingTime: singleRecipe.preperingTime,
      difficult: singleRecipe.difficult,
      serves: singleRecipe.serves,
      ingredients: cleanIngridients,
      steps: singleRecipe.steps,
      tags: singleRecipe.tags,
      categories: singleRecipe.categories,
    };
  };

  getOne = async (req, res) => {
    const id = req.params.id;
    const userId = 1; //req.user.id;

    const ans = await RecipesDal.getOne(id, userId);

    if (!ans) {
      return res.status(400).json({ message: "No recipe found" });
    }
    const cleanRecipe = this.genareteCleanRecipe(ans);
    res.json(cleanRecipe);
  };

  create = async (req, res) => {
    const userId = 1; //req.user.id;
    const {
      name,
      img,
      preperingTime,
      description,
      difficult,
      serves,
      tags,
      categories,
      steps,
      ingredients,
    } = req.body;
    console.log(name, preperingTime, difficult, serves);
    if (!name || !preperingTime || !difficult || !serves) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRecipe = await RecipesDal.create(
      {
        userId,
        name,
        img,
        preperingTime,
        description,
        difficult,
        serves,
        steps,
      },
      categories,
      tags,
      ingredients
    );

    if (newRecipe) {
      return res
        .status(201)
        .json({ message: "New recipe created", data: newRecipe });
    } else {
      return res.status(400).json({ message: "Invalid recipe data received" });
    }
  };

  update = async (req, res) => {
    const userId = 1; //req.user.id;
    const id = req.params.id;
    const {
      name,
      img,
      preperingTime,
      difficult,
      description,
      serves,
      tags,
      categories,
      steps,
      ingredients,
    } = req.body;
    if (!name || !preperingTime || !difficult || !serves) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const ans = await RecipesDal.update(
      id,
      {
        userId,
        name,
        img,
        preperingTime,
        description,
        difficult,
        serves,
        steps,
      },
      categories,
      tags,
      ingredients
    );

    if (!ans) {
      return res.status(400).json({ message: "recipe not edited" });
    }
    res.json(ans);
  };

  deleteOne = async (req, res) => {
    const userId = 1; //req.user.id;
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID required" });
    }
    await RecipesDal.deleteOne(id, userId);

    res.json(`recipe  with ID ${id} deleted`);
  };
}

module.exports = new RecipesController();
