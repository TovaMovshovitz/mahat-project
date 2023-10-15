import React from "react";
import SearchRecipe from "../SearchRecipe";
import { Typography } from "@mui/material";

function MyRecipes() {
  return (
    <>
      <Typography
        variant="h2"
        align="center"
        margin={2}
        style={{ color: "#ba8786" }}
      >
        My Recipes
      </Typography>
      <SearchRecipe src="api" />
    </>
  );
}

export default MyRecipes;
