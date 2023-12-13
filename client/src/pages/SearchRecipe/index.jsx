import React, { useState, useEffect } from "react";
import { Pagination, Typography, Button } from "@mui/material";
import axios from "axios";
import RecipesGrid from "../../components/RecipesGrid";
import Filters from "./Filters";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const SearchRecipe = ({ src }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [noRecipes, setNoRecipes] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPagegs] = useState(1);
  const startIndex = (page - 1) * itemsPerPage;
  const [where, setWhere] = useState({
    name: null,
    selectedDiets: [],
    selectedTypes: [],
    includeIngredients: [],
    maxReadyTime: null,
  });

  const generateSpoonacularUrl = () => {
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY3}&`;
    url += `number=${itemsPerPage}&offset=${startIndex}&addRecipeInformation=true&`;
    if (where.name) url += `query=${where.name}&`;
    if (where.maxReadyTime) url += `maxReadyTime=${where.maxReadyTime}&`;
    if (where.includeIngredients.length > 0)
      url += `includeIngredients=${where.includeIngredients
        .map((o) => o.name)
        .join(",")}&`;
    if (where.selectedDiets.length > 0)
      url += `diet=${where.selectedDiets.map((o) => o.name).join(",")}&`;
    if (where.selectedTypes.length > 0)
      url += `type=${where.selectedTypes.map((o) => o.name).join(",")}&`;
    return url;
  };

  const generateApiUrl = () => {
    let url = `http://localhost:3600/api/searchRecipe?`;
    url += `limit=${itemsPerPage}&offset=${startIndex}&`;
    if (where.name) url += `name=${where.name}&`;
    if (where.maxReadyTime) url += `maxPrepTime=${where.maxReadyTime}&`;
    if (where.includeIngredients.length > 0)
      url += `withIngredients=${where.includeIngredients
        .map((o) => o.id)
        .join(",")}&`;
    if (where.selectedDiets.length > 0)
      url += `tags=${where.selectedDiets.map((o) => o.id).join(",")}&`;
    if (where.selectedTypes.length > 0)
      url += `cateogries=${where.selectedTypes.map((o) => o.id).join(",")}&`;
    return url;
  };

  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [where, page, itemsPerPage, src]);

  useEffect(() => {
    setWhere({ ...where, name: queryParams.get("name") });
  }, []);

  useEffect(() => {
    setPage(1);
  }, [where, itemsPerPage, src]);

  const fetchData = async () => {
    let url;
    let ans;
    if (src == "spoonacular") {
      url = generateSpoonacularUrl();
      ans = await axios.get(url);
    } else {
      url = generateApiUrl();
      let config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      ans = await axios.get(url, config);
    }

    if (src == "spoonacular") {
      setRecipes(ans.data.results);
      setTotalPagegs(Math.ceil(ans.data.totalResults / itemsPerPage));
      if (ans.data.totalResults > 0) setNoRecipes(false);
      else setNoRecipes(true);
    } else {
      setRecipes(ans.data.rows);
      setTotalPagegs(Math.ceil(ans.data.count / itemsPerPage));
      if (ans.data.count > 0) setNoRecipes(false);
      else setNoRecipes(true);
    }
  };

  const deleteRecipe = async (recipeId) => {
    let config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    };
    const ans = await axios.delete(
      `http://localhost:3600/api/recipe/${recipeId}`,
      config
    );
    fetchData();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Filters where={where} setWhere={setWhere} />
      </div>

      {noRecipes && (
        <Typography
          variant="h4"
          align="center"
          margin={5}
          style={{ color: "#ba8786" }}
        >
          There is no recipes to display 😕 <br />
          <Button
            sx={{ margin: 5 }}
            variant="outlined"
            onClick={() => {
              navigate("/createRecipe");
            }}
          >
            create new recipe
          </Button>
        </Typography>
      )}

      {!noRecipes && (
        <>
          <RecipesGrid
            src={src}
            recipes={recipes}
            deleteRecipe={deleteRecipe}
          />
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, page) => {
              setPage(page);
            }}
          />
        </>
      )}
    </>
  );
};

export default SearchRecipe;
