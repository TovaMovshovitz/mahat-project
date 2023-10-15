import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useContext } from "react";
import { CgAddR } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import { GiCook } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AuthContext } from "../context/authContext";
import Logout from "../pages/auth/Logout";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

export default function Nav() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { currentUser } = useContext(AuthContext);
  const [searchText, setSearchText] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/spoonacular/Search?name=${encodeURIComponent(searchText)}`);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {currentUser && (
        <>
          <MenuItem>
            <Button
              onClick={() => {
                navigate("/spoonacular/Search");
                handleMobileMenuClose();
              }}
            >
              <BsSearch style={{ fontSize: 22 }} />
              Search
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              onClick={() => {
                navigate("/createRecipe");
                handleMobileMenuClose();
              }}
            >
              <CgAddR style={{ fontSize: 25 }} />
              Create
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              onClick={() => {
                navigate("/myRecipes");
                handleMobileMenuClose();
              }}
            >
              <GiCook style={{ fontSize: 25 }} />
              My Recipes
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              onClick={() => {
              }}
            >
              Hi {currentUser.name} <Logout />
            </Button>
          </MenuItem>
        </>
      )}
      {!currentUser && (
        <MenuItem>
          <Button
            onClick={() => {
              navigate("/login");
              handleMobileMenuClose();
            }}
          >
            Sign In
          </Button>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#ffffff" }}>
        <Toolbar>
          <img
            src="/logo.png" // Replace with the actual path to your logo image
            alt="Logo"
            style={{ height: "80px" }}
            onClick={() => {
              navigate("/");
            }}
          />
          <Search>
            <StyledInputBase
              sx={{ color: "#ba8786" }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              onKeyDown={handleSearch}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!currentUser && (
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </Button>
            )}
            {currentUser && (
              <>
                <Button
                  onClick={() => {
                    navigate("/spoonacular/Search");
                  }}
                >
                  <BsSearch style={{ fontSize: 22 }} />
                  Search
                </Button>
                <Button
                  onClick={() => {
                    navigate("/createRecipe");
                  }}
                >
                  <CgAddR style={{ fontSize: 25 }} />
                  Create
                </Button>
                <Button
                  onClick={() => {
                    navigate("/myRecipes");
                  }}
                >
                  <GiCook style={{ fontSize: 25 }} />
                  My Recipes
                </Button>
                <Button onClick={() => {}}>
                  Hi {currentUser.name} <Logout />
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
