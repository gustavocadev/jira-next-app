import { Box } from "@mui/material"
import Head from "next/head"
import { Navbar, Sidebar } from "../ui"

type Props = {
  title: string
  children: React.ReactNode
}

const Layout = ({ title = "open jira", children }: Props) => {
  return (
    <Box
      sx={{
        flexFlow: 1,
      }}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  )
}

export default Layout
