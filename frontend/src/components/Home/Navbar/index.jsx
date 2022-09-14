import { useState } from "react"
import {
  Link as UiLink,
  Container,
  Button,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material"
import { Link } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"

const Navbar = (props) => {
  const title = "SPENDLY."
  const sections = [
    { name: "Stats", id: "#stats" },
    { name: "Organizations", id: "#ngo" },
    { name: "About Us", id: "#aboutus" },
  ]
  const button = {
    text: "Login",
    link: "/login",
  }

  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="sticky" color="background" id={props.id}>
      <Container maxWidth="false">
        <Toolbar disableGutters>
          {/* small navbar size */}
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" }, fontWeight: "bolder", fontStyle: "italic" }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {sections.map((section) => (
                <MenuItem
                  key={section.name}
                  onClick={handleCloseNavMenu}
                  component={UiLink}
                  href={section.id}
                >
                  <Typography textAlign="center">{section.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* big navbar size */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, fontWeight: "bolder", fontStyle: "italic" }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {sections.map((section) => (
              <Button
                key={section.name}
                onClick={handleCloseNavMenu}
                component={UiLink}
                sx={{ my: 2, color: "white", display: "block", width: "auto" }}
                href={section.id}
                fullWidth={false}
                size="medium"
              >
                {section.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button component={Link} to={button.link} color="secondary" variant="outlined">
              {button.text}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
