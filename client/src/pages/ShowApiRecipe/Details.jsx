import { Box } from "@mui/material";
import React from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import TimerIcon from "@mui/icons-material/Timer";
import RoomServiceIcon from "@mui/icons-material/RoomService";

function Details({ recipe }) {
  return (
    <Box
      sx={{
        justifyContent: "space-around",
        p: 1,
        m: 1,
        display: "flex",
        width: { xs: "90%", sm: "60%", md: "50%" },
      }}
    >
      <RoomServiceIcon />
      <div> {recipe?.serves} Serveings</div>
      <div>&#8214;</div>
      <TimerIcon />
      <div>
        <b>{recipe?.preperingTime}</b> minutes
      </div>
      <div>&#8214;</div>
      <FavoriteRoundedIcon />
      <div>{recipe?.difficult}</div>
    </Box>
  );
}

export default Details;
