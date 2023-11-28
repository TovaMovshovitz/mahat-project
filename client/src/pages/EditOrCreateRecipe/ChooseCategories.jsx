import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

function ChooseCategories({ recipe, setRecipe }) {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      const { data: _categories } = await axios.get(
        "http://localhost:3600/api/category",
        config
      );
      if (_categories?.length) setCategoriesList(_categories);
    }
    fetchData();
  }, []);

  const setCategories = (categories) => {
    setRecipe({ ...recipe, categories });
  };

  const handleChange = (event, categories) => {
    setCategories(categories);
  };

  return (
    <>
      <Typography variant="h6">categories:</Typography>
      
        <ToggleButtonGroup
          value={recipe.categories}
          onChange={handleChange}
          color="primary"
        >
          {categoriesList.map((category) => (
            <ToggleButton
              sx={{ margin: "5px", height: "50px" }}
              value={category.id}
            >
              {category.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
    </>
  );
}
export default ChooseCategories;
