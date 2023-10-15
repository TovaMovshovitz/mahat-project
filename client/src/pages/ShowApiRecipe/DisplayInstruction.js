import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import { Timeline } from "@material-ui/lab";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const DisplayInstruction = ({ steps }) => {
  return (
    <>
      <Typography variant="h3">Directions:</Typography>
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
        {steps
          ?.sort((a, b) => b.number - a.number)
          .map((step, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot>
                  <FastfoodIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h6" component="span"></Typography>
                <Typography>{step.direction}</Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
      </Box>
    </>
  );
};

export default DisplayInstruction;

// <Timeline >
//     <TimelineItem>
//         <TimelineOppositeContent
//             sx={{ m: 'auto 0' }}
//             align="right"
//             variant="body2"
//             color="text.secondary"
//         >
//         </TimelineOppositeContent>
//         <TimelineSeparator>
//             <TimelineConnector />
//             <TimelineDot>
//                 <FastfoodIcon />
//             </TimelineDot>
//             <TimelineConnector />
//         </TimelineSeparator>
//         <TimelineContent sx={{ py: '12px', px: 2 }}>
//             <Typography variant="h6" component="span">

//             </Typography>
//             <Typography>Because you need strength</Typography>
//         </TimelineContent>
//     </TimelineItem>

//     <TimelineItem>
//         <TimelineOppositeContent
//             sx={{ m: 'auto 0' }}
//             align="right"
//             variant="body2"
//             color="text.secondary"
//         >
//         </TimelineOppositeContent>
//         <TimelineSeparator>
//             <TimelineConnector />
//             <TimelineDot>
//                 <FastfoodIcon />
//             </TimelineDot>
//             <TimelineConnector />
//         </TimelineSeparator>
//         <TimelineContent sx={{ py: '12px', px: 2 }}>
//             <Typography variant="h6" component="span">

//             </Typography>
//             <Typography>Because you need strength</Typography>
//         </TimelineContent>
//     </TimelineItem>
// </Timeline>
