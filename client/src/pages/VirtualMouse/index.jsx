import React from "react";
import { Typography } from "@mui/material";
import GuideBox from "./GuideBox";
function VirtualMouse() {
  return (
    <>
      <Typography
        variant="h3"
        align="center"
        margin={5}
        style={{ color: "#ba8786" }}
      >
        Virtual Mouse User Guide
      </Typography>
      <GuideBox />
    </>
  );
}

export default VirtualMouse;
