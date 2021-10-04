import { PaletteMode } from "@mui/material";
import { teal, grey } from "@mui/material/colors";

const MyTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: teal,
          secondary: teal,
          main: teal,
          divider: teal[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: grey,
          secondary: grey,
          main: grey,
          divider: grey[700],
          background: {
            default: grey[900],
            paper: grey[900],
          },
          text: {
            primary: "#ddd",
            secondary: grey[500],
          },
        }),
  },
});

export default MyTheme;
