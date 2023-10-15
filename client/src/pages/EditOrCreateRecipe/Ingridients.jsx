import {
  TextField,
  Typography,
  FormGroup,
  Paper,
  IconButton,
  Autocomplete,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import axios from "axios";

function Ingridients({ recipe, setRecipe,alert,setAlert }) {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measuringUtensilsList, setMeasuringUtensilsList] = useState([
    "cup",
    "s",
  ]);

  useEffect(() => {
    async function fetchData() {
      let config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };

      const { data: _ingredients } = await axios.get(
        "http://localhost:3600/api/ingredient",
        config
      );
      if (_ingredients?.length) setIngredientsList(_ingredients);

      const { data: _measuringUtensils } = await axios.get(
        "http://localhost:3600/api/measuringUtensil",
        config
      );
      if (_measuringUtensils?.length)
        setMeasuringUtensilsList(_measuringUtensils);
    }
    fetchData();
  }, []);

  const setIngredients = (ingredients) => {
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    if (
      recipe.ingredients?.length > 0 &&
      !recipe.ingredients[recipe.ingredients.length - 1].ingredientId
    )
      setAlert("Please select an ingredient");
    else
      setIngredients([
        ...recipe.ingredients,
        { qty: 1, measuringUtensilId: null, ingredientId: null, meta: null },
      ]);
  };

  const handleRemoveIngredient = (index) => {
    if (recipe.ingredients.length === 1)
      setIngredients([
        { qty: 1, measuringUtensilId: "", ingredientId: "", meta: "" },
      ]);
    else {
      recipe.ingredients.splice(index, 1);
      setIngredients(recipe.ingredients);
    }
  };

  return (
    <Paper
      elevation={16}
      sx={{
        my: 2,
        p: { xs: 6, md: 3 },
        width: { xs: "90", sm: "80%", md: "70%" },
      }}
    >
      <Typography htmlFor="recipeIngredients" shrink variant="h4">
        ingredients:
      </Typography>
      {recipe.ingredients?.map((ingredient, index) => (
        <FormGroup
          row
          key={index}
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "20ch",
              display: "flex",
              flexDirection: "row",
            },
          }}
        >
          <TextField
            value={ingredient.qty}
            label="qty"
            type="number"
            variant="standard"
            onChange={(event) => {
              recipe.ingredients[index].qty = parseInt(event.target.value);
              setIngredients(recipe.ingredients);
            }}
          ></TextField>
          <Autocomplete
            options={measuringUtensilsList}
            getOptionLabel={(option) => option.name}
            clearOnEscape
            value={
              ingredient.measuringUtensilId
                ? measuringUtensilsList.find(
                    (i) => i.id === ingredient.measuringUtensilId
                  )
                : null
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="measuring utensil"
                variant="standard"
              />
            )}
            onChange={(event, newValue) => {
              recipe.ingredients[index].measuringUtensilId =
                newValue?.id ?? null;
              setIngredients(recipe.ingredients);
            }}
          />
          <Autocomplete
            options={ingredientsList}
            required={true}
            value={
              ingredient.ingredientId
                ? ingredientsList.find((i) => i.id === ingredient.ingredientId)
                : null
            }
            getOptionLabel={(option) => option.name}
            clearOnEscape
            renderInput={(params) => (
              <TextField {...params} label="ingredient" variant="standard" />
            )}
            onChange={(event, newValue) => {
              if (alert) setAlert("");
              recipe.ingredients[index].ingredientId = newValue.id;
              setIngredients(recipe.ingredients);
            }}
          />
          <TextField
            value={ingredient.meta}
            label="meta "
            variant="standard"
            onChange={(event) => {
              recipe.ingredients[index].meta = event.target.value;
              setIngredients(recipe.ingredients);
            }}
          ></TextField>
          <IconButton aria-label="delete" size="small">
            <DeleteIcon
              fontSize="small"
              onClick={() => handleRemoveIngredient(index)}
            />
          </IconButton>
        </FormGroup>
      ))}
      <IconButton aria-label="add" size="large">
        <AddIcon fontSize="large" onClick={handleAddIngredient} />
      </IconButton>
      {alert && (
        <Alert sx={{ width: "50ch" }} severity="error">
          {alert}
        </Alert>
      )}
    </Paper>
  );
}

export default Ingridients;
