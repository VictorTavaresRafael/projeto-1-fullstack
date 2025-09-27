import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import SearchIcon from "@mui/icons-material/Search";
import { SearchInput } from "./styles";

export default function NavBar({ setSearch, search }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [state, setState] = React.useState({
    left: false,
    searchOpen: false,
  });

  const handleReloadPage = () => {
    window.location.href = "/";
  };


  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchToggle = () => {
    setState({ ...state, searchOpen: !state.searchOpen });
  };

  const handleCloseSearch = () => {
    setState({ ...state, searchOpen: false });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginBottom: "1.5rem",
        position: isScrolled && isMobile ? "fixed" : "relative",
        top: 0,
        zIndex: 1000,
        width: "100%",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#1f1e1e" }}>
        <Toolbar>
          <Link to={"/"} onClick={handleReloadPage}>
            <Box
              component="img"
              sx={{ width: 60, height: 60, marginRight: "1rem" }}
              src="/assets/darth-vader-18583.png"
              alt="Star Wars Logo"
            />
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", sm: "flex" } }}
          >
            Characters Star Wars
          </Typography>
          {isMobile ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open search"
              sx={{ ml: 2 }}
              onClick={handleSearchToggle}
            >
              <SearchIcon />
            </IconButton>
          ) : (
            <SearchInput
              icon={<SearchIcon />}
              placeholder="Search"
              value={search} // ✅ controlado
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
        </Toolbar>
      </AppBar>
      {isMobile && (
        <Drawer
          anchor="top"
          open={state.searchOpen}
          onClose={handleCloseSearch}
        >
          <Toolbar>
            <SearchInput
              icon={<SearchIcon />}
              placeholder="Search"
              value={search} // ✅ controlado
              onChange={(e) => setSearch(e.target.value)}
            />
          </Toolbar>
        </Drawer>
      )}
    </Box>
  );
}