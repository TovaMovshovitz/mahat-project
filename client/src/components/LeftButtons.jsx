import React from "react";
import SimCardDownloadRoundedIcon from "@mui/icons-material/SimCardDownloadRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import ShareIcon from "@mui/icons-material/Share";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import { Box, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
function LeftButtons({ recipe }) {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

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
   
      <IconButton
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
