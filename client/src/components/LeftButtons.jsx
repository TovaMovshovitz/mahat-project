import React from "react";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import { Box, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";

function LeftButtons({ recipe, src }) {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const style = {
    zIndex: 2,
    borderRadius: "50%",
    bottom: 45,
    backgroundColor: "#ba8786",
    mb: 1,
    color: "#ffffff",
    ":hover": {
      backgroundColor: "#6f6f6f",
    },
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        flexDirection: "column",
        justifyContent: "center",
        flexWrap: "wrap",
        right: { xs: "1px", md: "20px" },
        top: "330px",
      }}
    >
      {src == "api" && (
        <IconButton
          sx={style}
          onClick={(event) => {
            navigate(`/editRecipe?recipeId=${recipe.id}`);
          }}
        >
          <ModeEditIcon />
        </IconButton>
      )}

      <IconButton
        sx={style}
        onClick={() => {
          var textField = document.createElement("textarea");
          textField.innerText =
            "localhost:3000" + location.pathname + location.search;
          document.body.appendChild(textField);
          textField.select();
          document.execCommand("copy");
          textField.remove();
          setOpen(true);
        }}
      >
        <ContentCopyIcon />
      </IconButton>
      <IconButton
        sx={style}
        onClick={() => {
          window.print();
        }}
      >
        <PrintRoundedIcon />
      </IconButton>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message="url copied to clipboard"
      />
    </Box>
  );
}

export default LeftButtons;
