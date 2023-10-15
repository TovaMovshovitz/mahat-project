const db = require("../models/index");
const recipe = db.recipe;
const step = db.step;
const tag = db.tag;
const ingredient = db.ingredient;

const recipeIngredient = db.recipeIngredient;
const category = db.category;
const measuringUtensil = db.measuringUtensil;

const search = async (req, res) => {
  const {
    name,
    cateogries,
    tags,
    maxPreperingTime,
    difficult,
    withIngredients,
    withoutIngredients,
    offset,
    limit,
  } = req.query;

  let where = {};
  if (withIngredients) where.withIngredients = withIngredients;
  if (withoutIngredients) where.withoutIngredients = withoutIngredients;

  const { recipes, totalCount } = recipe.findAndCountAll({
    offset: offset,
    limit: limit,
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
      difficult: {
        [op.or]: difficult,
      },
      preperingTime: {
        [Op.between]: [preperingTimeMin, preperingTimeMan],
      },
    },
    include: [
      {
        model: category,
        through: { attributes: [] },
        where: {
          id: {
            [Op.or]: cateogries,
          },
        },
      },
      {
        model: tag,
        through: { attributes: [] },
        where: {
          id: {
            [Op.or]: tags,
          },
        },
      },
    ],
  });

  if (!books?.length) {
    return res.status(400).json({ message: "No books found" });
  }
  res.json(books);
};

async function searchAndFilterRecipes(
  searchTerm,
  categoryIds,
  ingredientIds,
  maxPrepTime,
  difficulty
) {
  try {
    // Build the base query for recipes
    const recipeQuery = {
      include: [
        { model: db.Category, as: "Categories", where: { id: categoryIds } },
        {
          model: db.RecipeIngredient,
          as: "Ingredients",
          include: ["Unit"],
          where: { ingredientId: ingredientIds },
        },
      ],
      where: {},
    };

    // Add search term to query
    if (searchTerm) {
      recipeQuery.where[Op.or] = [
        { title: { [Op.iLike]: `%${searchTerm}%` } },
        { description: { [Op.iLike]: `%${searchTerm}%` } },
        { "$Categories.name$": { [Op.iLike]: `%${searchTerm}%` } },
        { "$Ingredients.name$": { [Op.iLike]: `%${searchTerm}%` } },
      ];
    }

    // Add max prep time and difficulty filters to query
    if (maxPrepTime) {
      recipeQuery.where.prepTime = { [Op.lte]: maxPrepTime };
    }
    if (maxDifficulty) {
      recipeQuery.where.difficulty = { [Op.lte]: maxDifficulty };
    }

    // Execute the query and return the results
    const recipes = await db.Recipe.findAll(recipeQuery);
    return recipes;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { search };
