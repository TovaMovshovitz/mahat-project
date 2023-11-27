import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { GiSeatedMouse } from "react-icons/gi";
import { FaRegCopy } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";

const GuideBox = () => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = "virtual mouse.zip";
    downloadLink.download = "virtual mouse.zip";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const handleCopy = () => {
    setIsCopied(true);
    var textField = document.createElement("textarea");
    textField.innerText = '.venv\\Scripts\\pythonw.exe "virtual mouse.py"';
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    // Reset the "copied" state after 1 second
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
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
        Download the files by clicking{" "}
        <span
          style={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={handleDownload}
        >
          here
        </span>
        .
      </Guideline>

      <Guideline icon={<GiSeatedMouse />} title="Execute The Code">
        Open the command line in the downloaded folder and run this command:{" "}
        <br />
        <b>.venv\Scripts\pythonw.exe "virtual mouse.py"</b>{" "}
        {isCopied ? (
          <span style={{ fontSize: 10 }}>
            <BsCheckAll />
            Copied!
          </span>
        ) : (
          <span
            style={{ cursor: "pointer", fontSize: 10 }}
            onClick={handleCopy}
          >
            <FaRegCopy />
            Copy
          </span>
        )}
      </Guideline>

      <Guideline icon={<GiSeatedMouse />} title="Using Instructions">
        Your virtual mouse is ready! Use hand gestures to navigate: 👍, 👎, ✌️,
        ☝️
        <SubGuideline title="☝️ Pointing up">Move the mouse.</SubGuideline>
        <SubGuideline title="✌️ Victory">Make a click.</SubGuideline>
        <SubGuideline title="👍 Thumb up">Scroll up.</SubGuideline>
        <SubGuideline title="👎 Thumb down">Scroll down.</SubGuideline>
      </Guideline>

      {/* Stop Running Section */}
      <Guideline icon={<GiSeatedMouse />} title="Stop Running">
        To stop, simply press the <span style={{ fontWeight: "bold" }}>q</span>{" "}
        key at any time.
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
