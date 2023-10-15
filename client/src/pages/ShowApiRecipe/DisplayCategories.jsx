import * as React from "react";
import { Box, Chip } from "@mui/material";

const DisplayCategories = ({ categories }) => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          textAlign: "center",
          height: 50,
          lineHeight: "50px",
          elevation: 6,
        },
      }}
    >
      {categories?.map((category) => (
        <Chip label={category.name} sx={{ backgroundColor: "#E5D3D3" }} />
      ))}
    </Box>
  );
};
export default DisplayCategories;
