import { Link } from "react-router-dom"
import {
  List,
  Divider,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material"
import PieChartIcon from "@mui/icons-material/PieChart"
import FlourescentIcon from "@mui/icons-material/Flourescent"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import PersonIcon from "@mui/icons-material/Person"
import TravelExploreIcon from "@mui/icons-material/TravelExplore"

const NavList = ({ open }) => {
  return (
    <>
      <List>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          component={Link}
          to={"/dashboard"}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          component={Link}
          to={"/income"}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <FlourescentIcon />
          </ListItemIcon>
          <ListItemText primary="Income" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          component={Link}
          to={"/expenses"}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Expenses" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          component={Link}
          to={"/profile"}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          component={Link}
          to={"/discover"}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <TravelExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Discover" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </List>
    </>
  )
}
export default NavList
