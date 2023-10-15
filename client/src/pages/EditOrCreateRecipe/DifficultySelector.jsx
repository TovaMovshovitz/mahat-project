import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography } from "@mui/material";

function DifficultySelector({ recipe, setRecipe }) {
  const handleChange = (event, difficult) => {
    if (difficult !== null) {
      setRecipe({ ...recipe, difficult });
    }
  };

  return (
    <div>
      <Typography shrink variant="h6">
        Difficult
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={recipe.difficult}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="easy">easy</ToggleButton>
        <ToggleButton value="medium">medium</ToggleButton>
        <ToggleButton value="hard">hard</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default DifficultySelector;
