import { useState } from "react"
import { Outlet } from "react-router-dom"
import {
  Box,
  CssBaseline,
  Typography,
  IconButton,
  Divider,
  Toolbar,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { DrawerHeader, AppBar, Drawer } from "./style"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import NavList from "../../components/Main/NavList"
import ProfileHeader from "../../components/Main/ProfileHeader"

export default function MainLayout() {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" color="light" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <ProfileHeader />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bolder", fontStyle: "italic" }}
          >
            Expense Tracker
          </Typography>
          <IconButton onClick={handleDrawerClose} color="primary">
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <NavList open={open} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  )
}
