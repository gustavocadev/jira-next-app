import { createTheme } from "@mui/material"
import { grey, red } from "@mui/material/colors"

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F9FAFB",
    },
    primary: {
      main: "#4a148c",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
})

export { lightTheme }
