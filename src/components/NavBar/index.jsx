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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import Logout from "@mui/icons-material/Logout";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { SearchInput } from "./styles";
export default function NavBar({ setSearch, search, onLogout, user }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [state, setState] = React.useState({
    left: false,
    searchOpen: false,
  });

  // Estado para o menu do usuário
  const [anchorEl, setAnchorEl] = useState(null);


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

  // Funções para o menu do usuário
  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    onLogout();
  };

  // Função para obter iniciais do nome
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Função para obter o nome abreviado
  const getShortName = (name) => {
    if (!name) return "Usuário";
    const names = name.split(" ");
    return names.length > 1 ? `${names[0]} ${names[1][0]}.` : names[0];
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
            sx={{
              flexGrow: 1,
              display: { xs: "flex", sm: "flex" },
              fontWeight: "bold",
            }}
          >
            Characters Star Wars
          </Typography>

          {/* Campo de busca */}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mr: 2 }}
            />
          )}

          {/* Menu do usuário */}
          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            {/* Avatar */}
            <Avatar
              sx={{
                bgcolor: "#FFD700",
                color: "#1f1e1e",
                fontWeight: "bold",
                width: 32,
                height: 32,
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
              onClick={handleUserMenuOpen}
            >
              {getInitials(user?.name)}
            </Avatar>

            {/* Nome do usuário (apenas desktop) */}
            <Typography
              variant="body2"
              sx={{
                color: "white",
                ml: 1,
                display: { xs: "none", md: "block" },
                cursor: "pointer",
              }}
              onClick={handleUserMenuOpen}
            >
              {getShortName(user?.name)}
            </Typography>

            {/* Ícone do dropdown */}
            <IconButton
              size="small"
              sx={{
                color: "white",
                ml: 0.5,
              }}
              onClick={handleUserMenuOpen}
            >
              <KeyboardArrowDown />
            </IconButton>

            {/* Menu dropdown */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleUserMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 180,
                  "& .MuiMenuItem-root": {
                    fontSize: "0.9rem",
                    py: 1,
                  },
                },
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <MenuItem
                onClick={handleLogout}
                sx={{
                  color: "error.main",
                  "&:hover": {
                    backgroundColor: "rgba(211, 47, 47, 0.08)",
                  },
                }}
              >
                <Logout sx={{ mr: 1.5, fontSize: "1.2rem" }} />
                Sair
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer de busca para mobile */}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </Toolbar>
        </Drawer>
      )}
    </Box>
  );
}
