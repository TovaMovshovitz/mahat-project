import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditOrCreateRecipe from "./pages/EditOrCreateRecipe";
import Home from "./pages/home";
import SearchRecipe from "./pages/SearchRecipe";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";
import Nav from "./components/Nav";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthContextProvider } from "./context/authContext";
import ShowSpoonacularRecipe from "./pages/ShowSpoonacularRecipe";
import ShowApiRecipe from "./pages/ShowApiRecipe";
import Footer  from "./components/footer";
import MyRecipes from "./pages/myRecipes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ba8786",
      // main: '#d4a8a8',
    },
    secondary: {
      main: "#a66d6d",
    },
  },
  typography: {
    fontFamily: '"Handlee", cursive',
  },
});

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <ThemeProvider theme={theme}>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/myRecipes" element={<MyRecipes />} />
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route
                path="/spoonacular/Search"
                element={<SearchRecipe src="spoonacular" />}
              />
              <Route
                path="/CreateRecipe"
                element={<EditOrCreateRecipe action="create" />}
              />
              <Route
                path="/EditRecipe"
                element={<EditOrCreateRecipe action="edit" />}
              />
              <Route
                path="/spoonacular/show"
                element={<ShowSpoonacularRecipe />}
              />
              <Route path="/api/show" element={<ShowApiRecipe />} />
            </Routes>
            <Footer></Footer>

          </ThemeProvider>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
