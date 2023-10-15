import axios from "axios";

const convertRecipe = async (spoonacularRecipe) => {
  const name = spoonacularRecipe.title;
  const description = spoonacularRecipe.summary.summary;
  const img = spoonacularRecipe.image;
  const preperingTime = spoonacularRecipe.readyInMinutes;
  const serves = spoonacularRecipe.servings;
  let config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  const { data: categoriesList } = await axios.get(
    "http://localhost:3600/api/category",
    config
  );
  const categories = categoriesList
    .filter((category) => {
      return spoonacularRecipe.dishTypes.indexOf(category.name) != -1;
    })
    .map((category) => category.id);

  const { data: tagsList } = await axios.get(
    "http://localhost:3600/api/tag",
    config
  );
  const tags = tagsList
    .filter((tag) => {
      return spoonacularRecipe.diets.indexOf(tag.name) != -1;
    })
    .map((tag) => tag.id);

  let steps = [];
  spoonacularRecipe.steps.forEach((stepSection) => {
    stepSection.steps.forEach((step) => {
      steps.push(step.step);
    });
  });
  steps.map((step, index) => ({ number: index, direction: step }));

  const { data: measuringUtensils } = await axios.get(
    "http://localhost:3600/api/measuringUtensil",
    config
  );
  const { data: ingredientsList } = await axios.get(
    "http://localhost:3600/api/ingredient",
    config
  );

  const ingredients = spoonacularRecipe.extendedIngredients.map(
    (ingredient) => ({
      qty: ingredient.amount,
      measuringUtensilId: measuringUtensils.filter(
        (m) => m.name == ingredient.measures.us.unitShort
      )[0]?.id,
      ingredientId: ingredientsList.filter(
        (i) => i.name == ingredient.nameClean
      )[0]?.id,
      meta: ingredient.meta.join(),
    })
  );

  const newRrecipe = {
    name,
    img,
    preperingTime,
    description,
    difficult,
    serves,
    steps,
    ingredients,
    tags,
    categories,
  };
  const recipe = await axios.post(
    "http://localhost:3600/api/recipe",
    newRrecipe,
    config
  );
};

const recipe = {
  vegetarian: true,
  vegan: false,
  glutenFree: false,
  dairyFree: true,
  veryHealthy: true,
  cheap: false,
  veryPopular: false,
  sustainable: false,
  lowFodmap: false,
  weightWatcherSmartPoints: 37,
  gaps: "no",
  preparationMinutes: 5,
  cookingMinutes: 5,
  aggregateLikes: 0,
  healthScore: 91,
  creditsText: "Bourbon and Honey",
  sourceName: "Bourbon and Honey",
  pricePerServing: 1698.52,
  extendedIngredients: [
    {
      id: 10014037,
      aisle: "Alcoholic Beverages",
      image: "bourbon.png",
      consistency: "LIQUID",
      name: "bourbon",
      nameClean: "bourbon",
      original: "2 1/2 ounces bourbon",
      originalName: "bourbon",
      amount: 2.5,
      unit: "ounces",
      meta: [],
      measures: {
        us: { amount: 2.5, unitShort: "oz", unitLong: "ounces" },
        metric: { amount: 70.874, unitShort: "g", unitLong: "grams" },
      },
    },
    {
      id: 2064,
      aisle: "Produce;Spices and Seasonings",
      image: "mint.jpg",
      consistency: "SOLID",
      name: "fresh mint leaves",
      nameClean: "mint",
      original: "2 large fresh mint leaves",
      originalName: "fresh mint leaves",
      amount: 2.0,
      unit: "large",
      meta: ["fresh"],
      measures: {
        us: { amount: 2.0, unitShort: "large", unitLong: "larges" },
        metric: { amount: 2.0, unitShort: "large", unitLong: "larges" },
      },
    },
    {
      id: 2064,
      aisle: "Produce;Spices and Seasonings",
      image: "mint.jpg",
      consistency: "SOLID",
      name: "fresh mint leaves",
      nameClean: "mint",
      original: "5 large fresh mint leaves",
      originalName: "fresh mint leaves",
      amount: 5.0,
      unit: "large",
      meta: ["fresh"],
      measures: {
        us: { amount: 5.0, unitShort: "large", unitLong: "larges" },
        metric: { amount: 5.0, unitShort: "large", unitLong: "larges" },
      },
    },
    {
      id: 19296,
      aisle: "Nut butters, Jams, and Honey",
      image: "honey.png",
      consistency: "LIQUID",
      name: "honey",
      nameClean: "honey",
      original: "1/2 cup honey",
      originalName: "honey",
      amount: 0.5,
      unit: "cup",
      meta: [],
      measures: {
        us: { amount: 0.5, unitShort: "cups", unitLong: "cups" },
        metric: { amount: 118.294, unitShort: "ml", unitLong: "milliliters" },
      },
    },
    {
      id: 10014412,
      aisle: "Frozen",
      image: "ice-cubes.png",
      consistency: "SOLID",
      name: "ice",
      nameClean: "ice",
      original: "Crushed ice",
      originalName: "Crushed ice",
      amount: 1.0,
      unit: "serving",
      meta: ["crushed"],
      measures: {
        us: { amount: 1.0, unitShort: "serving", unitLong: "serving" },
        metric: { amount: 1.0, unitShort: "serving", unitLong: "serving" },
      },
    },
    {
      id: 2064,
      aisle: "Produce;Spices and Seasonings",
      image: "mint.jpg",
      consistency: "SOLID",
      name: "mint",
      nameClean: "mint",
      original: "1/2 ounce Pineapple-Mint Syrup",
      originalName: "Pineapple-Mint Syrup",
      amount: 0.5,
      unit: "ounce",
      meta: [],
      measures: {
        us: { amount: 0.5, unitShort: "oz", unitLong: "ounces" },
        metric: { amount: 14.175, unitShort: "g", unitLong: "grams" },
      },
    },
    {
      id: 2064,
      aisle: "Produce;Spices and Seasonings",
      image: "mint.jpg",
      consistency: "SOLID",
      name: "mint",
      nameClean: "mint",
      original: "Sprig of mint, for garnish",
      originalName: "mint, for garnish",
      amount: 1.0,
      unit: "Sprig",
      meta: ["for garnish"],
      measures: {
        us: { amount: 1.0, unitShort: "Sprig", unitLong: "Sprig" },
        metric: { amount: 1.0, unitShort: "Sprig", unitLong: "Sprig" },
      },
    },
    {
      id: 9266,
      aisle: "Produce",
      image: "pineapple.jpg",
      consistency: "SOLID",
      name: "pineapple",
      nameClean: "pineapple",
      original: "2 pieces grilled pineapple",
      originalName: "grilled pineapple",
      amount: 2.0,
      unit: "pieces",
      meta: [],
      measures: {
        us: { amount: 2.0, unitShort: "", unitLong: "" },
        metric: { amount: 2.0, unitShort: "", unitLong: "" },
      },
    },
    {
      id: 9266,
      aisle: "Produce",
      image: "pineapple.jpg",
      consistency: "SOLID",
      name: "pineapple",
      nameClean: "pineapple",
      original: "4 sliced grilled pineapple, cut into pieces",
      originalName: "sliced grilled pineapple, cut into pieces",
      amount: 4.0,
      unit: "",
      meta: ["sliced", "cut into pieces"],
      measures: {
        us: { amount: 4.0, unitShort: "", unitLong: "" },
        metric: { amount: 4.0, unitShort: "", unitLong: "" },
      },
    },
    {
      id: 14412,
      aisle: "Beverages",
      image: "water.png",
      consistency: "LIQUID",
      name: "water",
      nameClean: "water",
      original: "1/2 cup water",
      originalName: "water",
      amount: 0.5,
      unit: "cup",
      meta: [],
      measures: {
        us: { amount: 0.5, unitShort: "cups", unitLong: "cups" },
        metric: { amount: 118.294, unitShort: "ml", unitLong: "milliliters" },
      },
    },
  ],
  id: 883394,
  title: "Bourbon and Honey Grilled Pineapple Mint Julep",
  readyInMinutes: 10,
  servings: 1,
  sourceUrl:
    "http://www.bourbonandhoney.com/bourbon-and-honey-grilled-pineapple-mint-julep/",
  image: "https://spoonacular.com/recipeImages/883394-556x370.jpg",
  imageType: "jpg",
  summary:
    'Bourbon and Honey Grilled Pineapple Mint Julep is a <b>caveman, dairy free, primal, and vegetarian</b> recipe with 1 servings. For <b>$16.99 per serving</b>, this recipe <b>covers 59%</b> of your daily requirements of vitamins and minerals. One serving contains <b>2506 calories</b>, <b>21g of protein</b>, and <b>5g of fat</b>. 1 person found this recipe to be flavorful and satisfying. Only a few people really liked this side dish. Head to the store and pick up honey, water, ice, and a few other things to make it today. It will be a hit at your <b>The Fourth Of July</b> event. From preparation to the plate, this recipe takes roughly <b>10 minutes</b>. It is brought to you by Bourbon and Honey. Overall, this recipe earns an <b>improvable spoonacular score of 1%</b>. Similar recipes include <a href="https://spoonacular.com/recipes/pineapple-mint-julep-sangria-497736">Pineapple Mint Julep Sangria</a>, <a href="https://spoonacular.com/recipes/honey-peach-mint-julep-522923">Honey Peach Mint Julep</a>, and <a href="https://spoonacular.com/recipes/honey-bourbon-grilled-pork-tenderloin-82231">Honey-Bourbon Grilled Pork Tenderloin</a>.',
  cuisines: [],
  dishTypes: ["beverage", "drink"],
  diets: ["dairy free", "lacto ovo vegetarian"],
  occasions: ["father's day", "4th of july", "summer"],
  winePairing: { pairedWines: [], pairingText: "", productMatches: [] },
  instructions:
    "To make the Pineapple-Mint Syrup, in 1-quart saucepan, mix honey, water and grilled pineapple pieces. Heat about 2 minutes over medium-high heat, stirring constantly until honey is dissolved. Use the back of a wooden spoon to muddle the pineapple chunks. Remove from heat; add the mint and set aside 1 hour to cool. Remove the pineapple pieces and mint; pour syrup into glass jar. Cover jar; refrigerate until ready to use. Makes about 1 cup.Gently muddle the 2 pieces of pineapple and 2 mint leaves in the bottom of the glass. Add the Pineapple-Mint syrup, bourbon and some crushed ice; stir to chill the cocktail. Add more crushed ice and garnish with a sprig of mint and a grilled wedge of pineapple.",
  analyzedInstructions: [
    {
      name: "",
      steps: [
        {
          number: 1,
          step: "To make the Pineapple-Mint Syrup, in 1-quart saucepan, mix honey, water and grilled pineapple pieces.",
          ingredients: [
            {
              id: 9266,
              name: "pineapple",
              localizedName: "pineapple",
              image: "pineapple.jpg",
            },
            {
              id: 19296,
              name: "honey",
              localizedName: "honey",
              image: "honey.png",
            },
            { id: 0, name: "syrup", localizedName: "syrup", image: "" },
            {
              id: 14412,
              name: "water",
              localizedName: "water",
              image: "water.png",
            },
            {
              id: 2064,
              name: "mint",
              localizedName: "mint",
              image: "mint.jpg",
            },
          ],
          equipment: [
            {
              id: 404669,
              name: "sauce pan",
              localizedName: "sauce pan",
              image: "sauce-pan.jpg",
            },
          ],
        },
        {
          number: 2,
          step: "Heat about 2 minutes over medium-high heat, stirring constantly until honey is dissolved. Use the back of a wooden spoon to muddle the pineapple chunks.",
          ingredients: [
            {
              id: 1029354,
              name: "pineapple chunks",
              localizedName: "pineapple chunks",
              image: "pineapple-with-can.png",
            },
            {
              id: 19296,
              name: "honey",
              localizedName: "honey",
              image: "honey.png",
            },
          ],
          equipment: [
            {
              id: 404732,
              name: "wooden spoon",
              localizedName: "wooden spoon",
              image: "wooden-spoon.jpg",
            },
          ],
          length: { number: 2, unit: "minutes" },
        },
        {
          number: 3,
          step: "Remove from heat; add the mint and set aside 1 hour to cool.",
          ingredients: [
            {
              id: 2064,
              name: "mint",
              localizedName: "mint",
              image: "mint.jpg",
            },
          ],
          equipment: [],
          length: { number: 60, unit: "minutes" },
        },
        {
          number: 4,
          step: "Remove the pineapple pieces and mint; pour syrup into glass jar. Cover jar; refrigerate until ready to use. Makes about 1 cup.Gently muddle the 2 pieces of pineapple and 2 mint leaves in the bottom of the glass.",
          ingredients: [
            {
              id: 2064,
              name: "mint",
              localizedName: "mint",
              image: "mint.jpg",
            },
            {
              id: 9266,
              name: "pineapple",
              localizedName: "pineapple",
              image: "pineapple.jpg",
            },
            { id: 0, name: "syrup", localizedName: "syrup", image: "" },
          ],
          equipment: [],
        },
        {
          number: 5,
          step: "Add the Pineapple-Mint syrup, bourbon and some crushed ice; stir to chill the cocktail.",
          ingredients: [
            {
              id: 10114412,
              name: "crushed ice cubes",
              localizedName: "crushed ice cubes",
              image: "crushed-ice.png",
            },
            {
              id: 9266,
              name: "pineapple",
              localizedName: "pineapple",
              image: "pineapple.jpg",
            },
            {
              id: 0,
              name: "cocktail",
              localizedName: "cocktail",
              image: "rum-dark.jpg",
            },
            {
              id: 10014037,
              name: "bourbon",
              localizedName: "bourbon",
              image: "bourbon.png",
            },
            { id: 0, name: "syrup", localizedName: "syrup", image: "" },
            {
              id: 2064,
              name: "mint",
              localizedName: "mint",
              image: "mint.jpg",
            },
          ],
          equipment: [],
        },
        {
          number: 6,
          step: "Add more crushed ice and garnish with a sprig of mint and a grilled wedge of pineapple.",
          ingredients: [
            {
              id: 10114412,
              name: "crushed ice cubes",
              localizedName: "crushed ice cubes",
              image: "crushed-ice.png",
            },
            {
              id: 9266,
              name: "pineapple",
              localizedName: "pineapple",
              image: "pineapple.jpg",
            },
            {
              id: 2064,
              name: "mint",
              localizedName: "mint",
              image: "mint.jpg",
            },
          ],
          equipment: [],
        },
      ],
    },
  ],
  originalId: null,
};
const steps = [
  {
    name: "",
    steps: [
      {
        number: 1,
        step: "To make the Pineapple-Mint Syrup, in 1-quart saucepan, mix honey, water and grilled pineapple pieces.",
        ingredients: [
          {
            id: 9266,
            name: "pineapple",
            localizedName: "pineapple",
            image: "pineapple.jpg",
          },
          {
            id: 19296,
            name: "honey",
            localizedName: "honey",
            image: "honey.png",
          },
          { id: 0, name: "syrup", localizedName: "syrup", image: "" },
          {
            id: 14412,
            name: "water",
            localizedName: "water",
            image: "water.png",
          },
          { id: 2064, name: "mint", localizedName: "mint", image: "mint.jpg" },
        ],
        equipment: [
          {
            id: 404669,
            name: "sauce pan",
            localizedName: "sauce pan",
            image: "sauce-pan.jpg",
          },
        ],
      },
      {
        number: 2,
        step: "Heat about 2 minutes over medium-high heat, stirring constantly until honey is dissolved. Use the back of a wooden spoon to muddle the pineapple chunks.",
        ingredients: [
          {
            id: 1029354,
            name: "pineapple chunks",
            localizedName: "pineapple chunks",
            image: "pineapple-with-can.png",
          },
          {
            id: 19296,
            name: "honey",
            localizedName: "honey",
            image: "honey.png",
          },
        ],
        equipment: [
          {
            id: 404732,
            name: "wooden spoon",
            localizedName: "wooden spoon",
            image: "wooden-spoon.jpg",
          },
        ],
        length: { number: 2, unit: "minutes" },
      },
      {
        number: 3,
        step: "Remove from heat; add the mint and set aside 1 hour to cool.",
        ingredients: [
          { id: 2064, name: "mint", localizedName: "mint", image: "mint.jpg" },
        ],
        equipment: [],
        length: { number: 60, unit: "minutes" },
      },
      {
        number: 4,
        step: "Remove the pineapple pieces and mint; pour syrup into glass jar. Cover jar; refrigerate until ready to use. Makes about 1 cup.Gently muddle the 2 pieces of pineapple and 2 mint leaves in the bottom of the glass.",
        ingredients: [
          { id: 2064, name: "mint", localizedName: "mint", image: "mint.jpg" },
          {
            id: 9266,
            name: "pineapple",
            localizedName: "pineapple",
            image: "pineapple.jpg",
          },
          { id: 0, name: "syrup", localizedName: "syrup", image: "" },
        ],
        equipment: [],
      },
      {
        number: 5,
        step: "Add the Pineapple-Mint syrup, bourbon and some crushed ice; stir to chill the cocktail.",
        ingredients: [
          {
            id: 10114412,
            name: "crushed ice cubes",
            localizedName: "crushed ice cubes",
            image: "crushed-ice.png",
          },
          {
            id: 9266,
            name: "pineapple",
            localizedName: "pineapple",
            image: "pineapple.jpg",
          },
          {
            id: 0,
            name: "cocktail",
            localizedName: "cocktail",
            image: "rum-dark.jpg",
          },
          {
            id: 10014037,
            name: "bourbon",
            localizedName: "bourbon",
            image: "bourbon.png",
          },
          { id: 0, name: "syrup", localizedName: "syrup", image: "" },
          { id: 2064, name: "mint", localizedName: "mint", image: "mint.jpg" },
        ],
        equipment: [],
      },
      {
        number: 6,
        step: "Add more crushed ice and garnish with a sprig of mint and a grilled wedge of pineapple.",
        ingredients: [
          {
            id: 10114412,
            name: "crushed ice cubes",
            localizedName: "crushed ice cubes",
            image: "crushed-ice.png",
          },
          {
            id: 9266,
            name: "pineapple",
            localizedName: "pineapple",
            image: "pineapple.jpg",
          },
          { id: 2064, name: "mint", localizedName: "mint", image: "mint.jpg" },
        ],
        equipment: [],
      },
    ],
  },
];
const summary = {
  id: 883394,
  title: "Bourbon and Honey Grilled Pineapple Mint Julep",
  summary:
    'Bourbon and Honey Grilled Pineapple Mint Julep might be a good recipe to expand your beverage recipe box. This dairy free and lacto ovo vegetarian recipe serves 1 and costs <b>$16.99 per serving</b>. One portion of this dish contains around <b>21g of protein</b>, <b>5g of fat</b>, and a total of <b>2506 calories</b>. From preparation to the plate, this recipe takes approximately <b>10 minutes</b>. 1 person were impressed by this recipe. It can be enjoyed any time, but it is especially good for <b>The Fourth Of July</b>. If you have bourbon, ice, mint, and a few other ingredients on hand, you can make it. It is brought to you by Bourbon and Honey. With a spoonacular <b>score of 88%</b>, this dish is excellent. If you like this recipe, take a look at these similar recipes: <a href="https://spoonacular.com/recipes/pineapple-mint-julep-sangria-497736">Pineapple Mint Julep Sangria</a>, <a href="https://spoonacular.com/recipes/honey-peach-mint-julep-522923">Honey Peach Mint Julep</a>, and <a href="https://spoonacular.com/recipes/honey-whiskey-mint-julep-recipe-1108289">Honey Whiskey Mint Julep Recipe</a>.',
};
const full = { ...recipe, steps: steps, summary: summary };

// convertRecipe(full)

export default convertRecipe;
