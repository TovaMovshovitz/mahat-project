import { Alert, Paper, TextField, IconButton, Stack, Box } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";

function Steps({ recipe, setRecipe }) {
  const [alert, setAlert] = useState("");

  const addStep = () => {
    if (!recipe.steps[recipe.steps.length - 1].direction)
      setAlert("Please enter step");
    else
      setSteps([
        ...recipe.steps,
        { number: recipe.steps.length + 1, direction: "" },
      ]);
  };

  const deleteStep = (stepNumberToDelete) => {
    if (recipe.steps.length === 1) setSteps([{ number: 1, direction: "" }]);
    else
      setSteps(
        recipe.steps
          .filter((s) => s.number !== stepNumberToDelete)
          .map((step, index) => ({ ...step, number: index + 1 }))
      );
  };

  const setSteps = (steps) => {
    setRecipe({ ...recipe, steps });
  };
  return (
    <Paper
      elevation={16}
      sx={{
        my: 2,
        p: { xs: 6, md: 3 },
        width: { xs: "98%", sm: "80%", md: "70%" },
      }}
    >
      <Typography shrink variant="h4">
        steps:
      </Typography>
      {recipe.steps?.map((step, index) => {
        return (
          <>
            <TextField
              value={step.direction}
              key={step.number}
              label={`step ${step.number}`}
              variant="standard"
              multiline
              rows={2}
              onChange={(event) => {
                if (alert) setAlert("");
                const values = [...recipe.steps];
                values[step.number - 1].direction = event.target.value;
                setSteps(values);
              }}
              sx={{ width: "70%" }}
            />
            <IconButton aria-label="delete" size="small">
              <DeleteIcon onClick={() => deleteStep(step.number)} />
            </IconButton>
          </>
        );
      })}
      <IconButton aria-label="add" size="large">
        <AddIcon fontSize="large" onClick={addStep} />
      </IconButton>
      {alert && (
        <Alert sx={{ width: "50ch" }} severity="error">
          {alert}
        </Alert>
      )}
    </Paper>
  );
}

export default Steps;
