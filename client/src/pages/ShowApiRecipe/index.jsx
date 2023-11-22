import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Paper, Typography, Container, Divider, Box } from "@mui/material";
import axios from "axios";
import DisplayTags from "./DisplayTags";
import DisplayCategories from "./DisplayCategories";
import DisplayIngredients from "./DisplayIngredients";
import DisplayInstruction from "./DisplayInstruction";
import LeftButtons from "../../components/LeftButtons";
import Details from "./Details";

function ShowApiRecipe() {
  const [recipe, setRecipe] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    async function fetchData(recipeId) {
      let config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      const ans = await axios.get(
        `http://localhost:3600/api/recipe/${recipeId}`,
        config
      );
      if (ans.data) {
        setRecipe(ans.data);
      }
    }
    if (queryParams.get("recipeId")) fetchData(queryParams.get("recipeId"));
  }, []);

  return (
    <>
      <LeftButtons recipe={recipe} src="api" />
      <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography variant="h3">{recipe?.name}</Typography>
        <Typography variant="h11">{recipe?.description}</Typography>
        <Box
          sx={{
            width: { xs: "90%", sm: "60%", md: "50%" },
          }}
        >
          <img
            src={recipe.img?`http://localhost:3600/images/${recipe.img}`:"/defultImage.jpg"}
            style={{ width: "100%",margin: "auto" }}
          ></img>
        </Box>
        <Details recipe={recipe} />
        
        {recipe?.ingredients?.length > 0 && (
          <DisplayIngredients
            ingredients={recipe?.ingredients}
          ></DisplayIngredients>
        )}
        {recipe?.steps?.length > 0 && (
          <DisplayInstruction steps={recipe?.steps}></DisplayInstruction>
        )}
        {recipe?.tags?.length > 0 && (
          <DisplayTags tags={recipe?.tags}></DisplayTags>
        )}
        {recipe?.categories?.length > 0 && (
          <DisplayCategories
            categories={recipe?.categories}
          ></DisplayCategories>
        )}
      </Paper>
    </>
  );
}

export default ShowApiRecipe;
