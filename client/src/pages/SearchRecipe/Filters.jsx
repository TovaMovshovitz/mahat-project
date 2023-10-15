import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Stack,
  Paper,
  Autocomplete,
  TextField,
  Divider,
  Input,
  Typography,
} from "@mui/material";
import SelectedFilter from "./SelectedFilter";

function Filters({ where, setWhere }) {
  const [ingredients, setiIngredients] = useState([]);
  const [types, setTypes] = useState([{ name: "ff" }, { name: "sss" }]);
  const [diets, setDiets] = useState([{ name: "ss" }, { name: "sss" }]);

  useEffect(() => {
    async function fetchData() {
      let config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };

      const { data: _ingredients } = await axios.get(
        "http://localhost:3600/api/ingredient",
        config
      );
      if (_ingredients?.length) setiIngredients(_ingredients);
      const { data: _categories } = await axios.get(
        "http://localhost:3600/api/category",
        config
      );
      if (_categories?.length) setTypes(_categories);

      const { data: _tags } = await axios.get(
        "http://localhost:3600/api/tag",
        config
      );
      if (_categories?.length) setDiets(_tags);
    }
    fetchData();
  }, []);

  const maxReadyTimeOptions = [15, 30, 45, 60];

  const style = {
    multiple: true,
    limitTags: 0,
    sx: { width: "350px" },
  };

  return (
    <Paper
      elevation={16}
      sx={{
        textAlign: "center",
        boxShadow: 1,
        borderRadius: 2,
        backgroundColor: "#e5d3d3",
        width: "90%",
        padding: 2,
        margin: 2,
      }}
    >
      <Typography variant="h4">filter</Typography>
      <Input
        value={where.name}
        placeholder="something yummy is coming..."
        variant="outlined"
        sx={{ margin: 5, width: "50%" }}
        onChange={(event) => setWhere({ ...where, name: event.target.value })}
      />
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Autocomplete
          {...style}
          options={ingredients}
          getOptionLabel={(option) => option.name}
          value={where.includeIngredients}
          renderInput={(params) => (
            <TextField
              {...params}
              label="includeIngredients"
              placeholder="includeIngredients"
            />
          )}
          onChange={(event, values) => {
            setWhere({ ...where, includeIngredients: values });
          }}
        />
        <Autocomplete
          {...style}
          options={ingredients}
          getOptionLabel={(option) => option.name}
          value={where.excludeIngredients}
          renderInput={(params) => (
            <TextField
              {...params}
              label="exclude Ingredients"
              placeholder="exclude Ingredients"
            />
          )}
          onChange={(event, values) => {
            setWhere({ ...where, excludeIngredients: values });
          }}
        />
        <Autocomplete
          {...style}
          value={where.selectedDiets}
          options={diets}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="diets" placeholder="diets" />
          )}
          onChange={(event, values) => {
            setWhere({ ...where, selectedDiets: values });
          }}
        />
        <Autocomplete
          {...style}
          options={types}
          getOptionLabel={(option) => option.name}
          value={where.selectedTypes}
          renderInput={(params) => (
            <TextField {...params} label="types" placeholder="types" />
          )}
          onChange={(event, values) => {
            setWhere({ ...where, selectedTypes: values });
          }}
        />
        <Autocomplete
          limitTags={1}
          options={maxReadyTimeOptions}
          getOptionLabel={(option) => option}
          value={where.maxReadyTime}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Cook and Prep. Time"
              placeholder="Cook and Prep. Time"
            />
          )}
          sx={{ width: "350px" }}
          onChange={(event, value) => {
            setWhere({ ...where, maxReadyTime: value });
          }}
        />
      </Stack>

      {(where.includeIngredients?.length != 0 ||
        where.excludeIngredients?.length != 0 ||
        where.selectedTypes?.length != 0 ||
        where.selectedDiets?.length != 0) && (
        <Divider variant="middle" sx={{ padding: 2 }} />
      )}
      <div
        style={{
          flexWrap: "wrap",
          justifyContent: "flex-start",
          display: "flex",
        }}
      >
        {" "}
        {where.includeIngredients?.length != 0 && (
          <SelectedFilter
            name="includeIngredients"
            where={where}
            setWhere={setWhere}
          ></SelectedFilter>
        )}
        {where.excludeIngredients?.length != 0 && (
          <SelectedFilter
            name="excludeIngredients"
            where={where}
            setWhere={setWhere}
          ></SelectedFilter>
        )}
        {where.selectedDiets?.length != 0 && (
          <SelectedFilter
            name="selectedDiets"
            where={where}
            setWhere={setWhere}
          ></SelectedFilter>
        )}
        {where.selectedTypes?.length != 0 && (
          <SelectedFilter
            name="selectedTypes"
            where={where}
            setWhere={setWhere}
          ></SelectedFilter>
        )}
      </div>
    </Paper>
  );
}
export default Filters;
