import { Typography } from "@material-ui/core";
import React from "react";
import { Box } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { styled } from "@mui/material/styles";
import { BsTypeH1 } from "react-icons/bs";
import { useState } from "react";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));
const Home = () => {
 

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          backgroundColor: "#E5D3D3",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <video autoPlay muted width="80%" loop>
          <source src="/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <br></br>
        <br></br>
      </div>

      <Typography>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            style={{
              fontFamily: '"Handlee", cursive',
              color: "#ba8786",
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            Pinch of Passion:
          </Typography>
          <Typography
            variant="h4"
            style={{
              fontFamily: '"Handlee", cursive',
              color: "#ba8786",
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            Redefining the Culinary Experience with Touchless Cooking and Recipe
            Storage
          </Typography>
        </div>
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
          <div>
            <FastfoodIcon />
            <Typography variant="h6" component="span">
              {" "}
              Welcome to Pinch of Passion: A Virtual Culinary Haven
            </Typography>
            <Typography>
              Pinch of Passion provides users with a delightful culinary haven
              that celebrates the art of cooking while embracing technological
              advancements. The platform's sleek and user-friendly interface
              invites users to embark on a culinary journey that seamlessly
              blends tradition with innovation.
            </Typography>
          </div>

          <br></br>

          <div>
            <FastfoodIcon />
            <Typography variant="h6" component="span">
              {" "}
              Touchless Cooking: A Paradigm Shift in the Kitchen
            </Typography>
            <Typography>
              One of the standout features of Pinch of Passion is its touchless
              cooking option. Through the use of advanced computer vision and
              gesture recognition technology, users can control their virtual
              kitchen with simple hand gestures, transforming their fingers into
              virtual mice. This groundbreaking feature allows users to navigate
              through recipes, scroll, and access various functions on the
              platform without ever touching a physical device. It ensures a
              hygienic and hands-free cooking experience, perfect for those who
              love to experiment in the kitchen without the mess or hassle.
            </Typography>
          </div>

          <br></br>

          <div>
            <FastfoodIcon />
            <Typography variant="h6" component="span">
              {" "}
              Your Personal Recipe Storage: A Culinary Memory Bank
            </Typography>
            <Typography>
              Pinch of Passion offers users the convenience of saving and
              organizing their favorite recipes in a personal virtual recipe
              box. By creating an account, users can easily store recipes,
              complete with photos, notes, and customized tags.
            </Typography>
          </div>

          <br></br>

          <div>
            <FastfoodIcon />
            <Typography variant="h6" component="span">
              {" "}
              Expanding Your Culinary Horizons: Discovering New Recipes
            </Typography>
            <Typography>
              In addition to providing a safe haven for your cherished recipes,
              Pinch of Passion is a treasure trove of new culinary delights.
              Users can explore a vast database of curated recipes, ranging from
              traditional classics to innovative and exotic dishes. With its
              user-friendly search and filter options, the platform ensures that
              users can easily find recipes that cater to their dietary
              preferences and skill levels.
            </Typography>
          </div>

          <br></br>
        </Box>
      </Typography>
    </>
  );
};

export default Home;
