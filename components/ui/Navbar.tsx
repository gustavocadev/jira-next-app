import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import React from "react"
import { useContext } from "react"
import { UIContext } from "../../context/ui"
import Link from "next/link"

type Props = {}

const Navbar = (props: Props) => {
  const { openSideMenu } = useContext(UIContext)
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <Link href="/">
          <a>
            <Typography variant="h6" color="inherit">
              Open Jira
            </Typography>
          </a>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
