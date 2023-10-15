import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

const RecipesGrid = ({ recipes, src, deleteRecipe }) => {
  return (
    <>
      <div
        style={{
          flexWrap: "wrap",
          justifyContent: "center",
          display: "flex",
          padding: 50,
        }}
      >
        {recipes?.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            src={src}
            deleteRecipe={deleteRecipe}
          />
        ))}
      </div>
    </>
  );
};

export default RecipesGrid;
