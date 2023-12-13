import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const DisplayIngredients = ({ ingredients }) => {
  const [open, setOpen] = React.useState(false);
  const [currentIng, setCurrentIng] = React.useState("");
  const [substitutes, setSubstitutes] = React.useState([]);

  const handleClickOpen = async (ingredient) => {
    const ans = await axios.get(
      `https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${ingredient}&apiKey=${process.env.REACT_APP_API_KEY3}`
    );
    if (ans.data.status == "success") {
      setCurrentIng(ans.data.ingredient);
      setSubstitutes(ans.data.substitutes);
      setOpen(true);
    } else {
      setCurrentIng(ans.data.message);
      setSubstitutes([]);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography variant="h4">Ingredients:</Typography>
      <Box
        sx={{
          marginRight: "auto",
          marginLeft: "auto",
          textAlign: "left",
          boxShadow: 1,
          borderRadius: 2,
          backgroundColor: "#E5D3D3",
          maxWidth: 1200,
          margin: { xs: 1, sm: 5, md: 7 },
          p: { xs: 1, sm: 5, md: 7 },
        }}
      >
        {ingredients?.map((ingredient) => (
          <div>
            - &nbsp;
            <Typography component="span" align="left">{`${
              ingredient.qty ? ingredient.qty : ""
            } ${
              ingredient.measuringUtensilName
                ? ingredient.measuringUtensilName
                : ""
            } ${ingredient.meta ? ingredient.meta : ""}`}</Typography>
            <LightTooltip
              title={
                <div>
                  <div>
                    <img
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.ingredientImg}`}
                    />
                  </div>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => {
                      handleClickOpen(ingredient.ingredientName);
                    }}
                  >
                    <em>dont have?</em>
                  </Button>
                </div>
              }
            >
              <Typography
                component="span"
                align="left"
              >{` ${ingredient.ingredientName}`}</Typography>
            </LightTooltip>
          </div>
        ))}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>{currentIng}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {substitutes.map((substitute) => (
                <p>{substitute}</p>
              ))}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};
export default DisplayIngredients;
