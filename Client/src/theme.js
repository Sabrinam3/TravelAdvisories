import { createMuiTheme } from "@material-ui/core/styles";
export default createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(147, 217, 71, 1)",
      main: "rgba(107, 140, 67, 1)",
      dark: "rgba(67, 115, 13, 1)",
      contrastText: "#fff"
    },
    secondary: {
      light: "rgba(186, 118, 60, 1)",
      main: "rgba(150, 75, 10, 1)",
      dark: "rgba(108, 53, 4, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "rgba(246, 107, 107, 1)",
      main: "rgba(223, 26, 10, 1)",
      dark: "rgba(128, 4, 4, 1)",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  }
});
