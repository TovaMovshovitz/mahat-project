import { useState, React } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const ApiCard = ({ recipe, deleteRecipe }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleSubmission = (event) => {
    event.stopPropagation();
    deleteRecipe(recipe.id);
    setOpen(false);
  };

  const navigate = useNavigate();

  const style = {
    zIndex: 2,
    borderRadius: "50%",
    bottom: 45,
    backgroundColor: "#ba8786",
    color: "#ffffff",
    transform: "translateY(50%)",
    ":hover": {
      backgroundColor: "#6f6f6f",
    },
  };

  return (
    <>
      <IconButton
        sx={{ ...style, left: "16.5rem" }}
        onClick={(event) => {
          event.stopPropagation();
          navigate(`/editRecipe?recipeId=${recipe.id}`);
        }}
      >
        <ModeEditIcon />
      </IconButton>
      <IconButton sx={{ ...style, left: "11rem" }} onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this recipe?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmission} autoFocus>
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApiCard;
