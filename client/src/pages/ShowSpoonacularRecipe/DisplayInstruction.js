import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";

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
      <Typography variant="h4">Directions:</Typography>
      <Box
        sx={{
          marginRight: "auto",
          marginLeft: "auto",
          textAlign: "center",
          boxShadow: 1,
          borderRadius: 2,
          backgroundColor: "#E5D3D3",
          maxWidth: 1200,
          margin: { xs: 1, sm: 5, md: 7 },
          p: { xs: 1, sm: 5, md: 7 },
        }}
      >
        {steps?.map((section, ind) => (
          <Timeline
            key={ind}
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {section.steps.map((step, index) => (
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
                  <Typography>{step.step}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
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
