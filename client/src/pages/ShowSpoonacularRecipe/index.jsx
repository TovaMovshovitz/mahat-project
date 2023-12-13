import React, { useState, useEffect } from "react";
import { Paper, Typography, Container, Divider, Box } from "@mui/material";
import axios from "axios";
import DisplayTags from "./DisplayTags";
import DisplayCategories from "./DisplayCategories";
import DisplayIngredients from "./DisplayIngredients";
import DisplayInstruction from "./DisplayInstruction";
import LeftButtons from "../../components/LeftButtons";
import Details from "./Details";
import { useLocation } from "react-router-dom";
import htmlParser from "react-html-parser";
import RecipesGrid from "../../components/RecipesGrid";

function ShowSpoonacularRecipe() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [recipe, setRecipe] = useState({});
  const [similarRecipe, setSimilarRecipe] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (queryParams.get("recipeId")) {
        const ans = await axios.get(
          `https://api.spoonacular.com/recipes/${queryParams.get(
            "recipeId"
          )}/information?apiKey=${process.env.REACT_APP_API_KEY3}`
        );
        if (ans.data) {
          setRecipe(ans.data);
        }
        const rnd = await axios.get(
          `https://api.spoonacular.com/recipes/${queryParams.get(
            "recipeId"
          )}/similar?number=4&apiKey=${process.env.REACT_APP_API_KEY3}`
        );
        if (rnd.data) {
          setSimilarRecipe(rnd.data);
        }
      }
    }
    fetchData();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [queryParams.get("recipeId")]);

  return (
    <>
      <LeftButtons recipe={recipe} />
      <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Box sx={{ width: { xs: "80%", sm: "70%", md: "60%" } }}>
          {" "}
          <Typography variant="h3" style={{ fontFamily: '"Handlee", cursive', color: "#ba8786", marginBottom:10}}>
            {recipe?.title}
          </Typography>
          <Typography variant="h11">
            {htmlParser(recipe?.summary)}
          </Typography>
        </Box>
        <br />
        <Box sx={{ width: { xs: "90%", sm: "60%", md: "50%" } }}>
          <img
            src={recipe?.image}
            style={{ marginTop: 20, width: "100%" }}
          ></img>
        </Box>
        <Details recipe={recipe}></Details>
        {recipe.extendedIngredients?.length > 0 && (
          <DisplayIngredients
            ingredients={recipe?.extendedIngredients}
          ></DisplayIngredients>
        )}
        {recipe.analyzedInstructions?.length > 0 && (
          <DisplayInstruction
            steps={recipe?.analyzedInstructions}
          ></DisplayInstruction>
        )}
        {recipe.diets?.length > 0 && (
          <DisplayTags tags={recipe?.diets}></DisplayTags>
        )}
        {recipe.dishTypes?.length > 0 > 0 && (
          <DisplayCategories categories={recipe?.dishTypes}></DisplayCategories>
        )}
        <RecipesGrid src="spoonacular" recipes={similarRecipe}></RecipesGrid>
      </Paper>
    </>
  );
}

export default ShowSpoonacularRecipe;
