import * as React from "react";
import { Card, Divider, Typography, AspectRatio } from "@mui/material";
import ApiCard from "./ApiCard";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe, src, deleteRecipe }) => {
  const navigate = useNavigate();
  const handelClick = () => {
    if (src == "spoonacular")
      navigate(`/spoonacular/show?recipeId=${recipe?.id}`);
    else navigate(`/Api/show?recipeId=${recipe?.id}`);
  };
  const getRecipeName = () => {
    let name;
    if (src == "api") name = recipe?.name;
    else name = recipe?.title;
    if (name?.length > 65) return name.substring(0, 65) + "...";
    return name;
  };

  const getImg = (src) => {
    if (src != "api")
      return `https://spoonacular.com/recipeImages/${recipe?.id}-312x231.jpg`;
    if (recipe.img) return `http://localhost:3600/images/${recipe.img}`;
    return "/defultImage.jpg";
  };
  return (
    <Card
      onClick={handelClick}
      variant="outlined"
      sx={{
        minWidth: "328px",
        maxWidth: "328px",
        m: 2.5,
        borderWidth: 0,
        "&:hover": { boxShadow: "6px 6px 2px 1px rgba(189, 104, 109, .2)" },
      }}
    >
      <div>
        <div ratio="1.75">
          <img
            border="none"
            outline="none"
            src={getImg(src)}
            loading="lazy"
            alt=""
            style={{ width: 312, height: 231 }}
          />
        </div>
        {src == "api" && (
          <ApiCard deleteRecipe={deleteRecipe} recipe={recipe} />
        )}
      </div>
      <div style={{ height: 50 }}>
        <Typography level="h4" sx={{ fontSize: "32", mt: 2, fontWeight: "10" }}>
          {getRecipeName()}
        </Typography>
      </div>
      <Divider />
      <Card
        variant="soft"
        sx={{
          display: "flex",
          gap: 1,
          py: 1.5,
          bgcolor: "background.level1",
        }}
      >
        <Typography
          level="body1"
          sx={{ fontWeight: "20", color: "text.secondary" }}
        >
          &#9201;{" "}
          {src == "api" ? (
            <>{recipe.preperingTime}</>
          ) : (
            <>{recipe.readyInMinutes}</>
          )}{" "}
          minutes
        </Typography>
        <Divider orientation="vertical" />
        <Typography
          level="body1"
          sx={{ fontWeight: "20", color: "text.secondary" }}
        >
          &#127860;{" "}
          {src == "api" ? <>{recipe.serves}</> : <>{recipe.servings}</>}{" "}
          servings
        </Typography>
        <Divider orientation="vertical" />
        <Typography
          level="body1"
          sx={{ fontWeight: "20", color: "text.secondary" }}
        >
          {src == "api" ? (
            <>&#128507; {recipe.difficult}</>
          ) : (
            <>&#128077; {recipe.aggregateLikes} likes</>
          )}
        </Typography>
      </Card>
    </Card>
  );
};
export default RecipeCard;
