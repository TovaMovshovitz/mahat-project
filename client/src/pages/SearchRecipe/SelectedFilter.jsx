import * as React from "react";
import { Chip, Box } from "@mui/material";

const SelectedFilter = ({ name, where, setWhere }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        width: "auto",
        paddingLeft: 2,
        margin: 1,
      }}
    >
      {name}:
      {where[name].map((item, ind) => (
        <Chip
          key={ind}
          label={item.name}
          sx={{
            backgroundColor: "#f5f5f5",
          }}
          onDelete={() => {
            where[name] = where[name].filter((tmp) => item.id !== tmp.id);
            setWhere({ ...where });
          }}
        />
      ))}
    </Box>
  );
};
export default SelectedFilter;
