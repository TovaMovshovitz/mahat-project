import React from "react";
import { Box, Typography } from "@mui/material";
import { GiSeatedMouse } from "react-icons/gi";

const GuideBox = () => {
  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = "virtual mouse.exe";
    downloadLink.download = "virtual mouse.exe";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  
  return (
    <Box
      sx={{
        marginRight: "auto",
        marginLeft: "auto",
        textAlign: "left",
        boxShadow: 3,
        borderRadius: 8,
        backgroundColor: "#E5D3D3",
        maxWidth: 1200,
        margin: { xs: 1, sm: 5, md: 7 },
        p: { xs: 1, sm: 5, md: 7 },
      }}
    >
      <Guideline icon={<GiSeatedMouse />} title="Download">
        Download the executable file by clicking{" "}
        <span
          style={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={handleDownload}
        >
          here
        </span>
        .
      </Guideline>

      <Guideline icon={<GiSeatedMouse />} title="Execute The Code">
        Run the executable file you downloaded.
      </Guideline>

      <Guideline icon={<GiSeatedMouse />} title="Using Instructions">
        Your virtual mouse is ready! Use hand gestures to navigate: 👍, 👎, ✊,
        ☝️
        <SubGuideline title="☝️ Pointing up">Move the mouse.</SubGuideline>
        <SubGuideline title="✊ Closed Fist">Make a click.</SubGuideline>
        <SubGuideline title="👍 Thumb up">Scroll up.</SubGuideline>
        <SubGuideline title="👎 Thumb down">Scroll down.</SubGuideline>
      </Guideline>

      {/* Stop Running Section */}
      <Guideline icon={<GiSeatedMouse />} title="Stop Running">
        To stop, simply make the{" "}
        <span style={{ fontWeight: "bold" }}>Victory gesture ✌️</span> at any
        time.{" "}
      </Guideline>
    </Box>
  );
};

const Guideline = ({ icon, title, children }) => (
  <div style={{ marginBottom: 20 }}>
    {icon}
    <Typography variant="h5" sx={{ display: "inline", ml: 2 }}>
      {title}
    </Typography>
    <Typography>{children}</Typography>
  </div>
);

const SubGuideline = ({ title, children }) => (
  <div style={{ marginLeft: 30 }}>
    <Typography variant="h6" sx={{ display: "inline" }}>
      {title}
    </Typography>
    <Typography>{children}</Typography>
  </div>
);

export default GuideBox;
