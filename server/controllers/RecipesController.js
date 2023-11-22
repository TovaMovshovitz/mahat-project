const RecipesDal = require("../dal/RecipesDal");

class RecipesController {
  getAll = async (req, res, next) => {
    const userId = req.user.id;
    try {
      const ans = await RecipesDal.getAll(userId);

      if (!ans?.length) {
        return res.status(400).json({ message: "No recipes found" });
      }
      res.json(ans);
    } catch (error) {
      next(error);
    }
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

  getOne = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;

    try {
      const ans = await RecipesDal.getOne(id, userId);

      if (!ans) {
        return res.status(400).json({ message: "No recipe found" });
      }
      const cleanRecipe = this.genareteCleanRecipe(ans);
      res.json(cleanRecipe);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    const userId = req.user.id;
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
    if (!name || !preperingTime || !difficult || !serves) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
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
        return res
          .status(400)
          .json({ message: "Invalid recipe data received" });
      }
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    const userId = req.user.id;
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
    try {
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
    } catch (error) {
      next(error);
    }
  };

  deleteOne = async (req, res, next) => {
    const userId = req.user.id;
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID required" });
    }
    try {
      await RecipesDal.deleteOne(id, userId);

      res.json(`recipe  with ID ${id} deleted`);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new RecipesController();
