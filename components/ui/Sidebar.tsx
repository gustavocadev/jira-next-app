import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import { useContext } from "react"
import { UIContext } from "../../context/ui"

type Props = {}

const menuItems = ["inbox", "starred", "send email", "draft"]

const Sidebar = (props: Props) => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext)
  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box
        sx={{
          width: "250px",
        }}
      >
        <Box
          sx={{
            padding: "5px 10px",
          }}
        >
          <Typography variant="h4">Menú</Typography>
        </Box>
        <List>
          {menuItems.map((text, idx) => (
            <ListItem key={text} button>
              <ListItemIcon>
                {idx % 2 === 0 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((text, idx) => (
            <ListItem key={text} button>
              <ListItemIcon>
                {idx % 2 === 0 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar
