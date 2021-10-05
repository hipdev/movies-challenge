import {
  Button,
  Drawer,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { FormEvent } from "react";
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/system";

type Props = {
  openDrawer: boolean;
  toggleDrawer: (value: boolean) => void;
};

const DrawerNewMovie = ({ openDrawer, toggleDrawer }: Props) => {
  const theme: Theme = useTheme();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("enviando form");
  };

  return (
    <Drawer
      anchor={"right"}
      open={openDrawer}
      onClose={() => toggleDrawer(false)}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: { md: "flex" },
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <Typography variant="h5" gutterBottom component="div">
            Add new movie
          </Typography>
          <TextField
            id="outlined-basic"
            label="Movie name"
            variant="outlined"
            margin="dense"
            required
          />
          <TextareaAutosize
            aria-label="Movie description"
            placeholder="Movie description"
            style={{
              width: 300,
              background: "transparent",
              padding: "1rem",
              borderRadius: "3px",
              fontSize: "16px",
              marginTop: "0.7rem",
              marginBottom: "0.7rem",
              color: theme.palette.mode == "light" ? "inherit" : "#ddd",
            }}
            required
          />
          <TextField
            id="outlined-basic"
            label="Year"
            variant="outlined"
            type="number"
            margin="dense"
            inputProps={{ min: "1900", max: "2022" }}
            placeholder="Ex: 2010"
            required
          />
          <Button
            variant="outlined"
            component="label"
            style={{ marginTop: "0.7rem" }}
          >
            Movie picture
            <input type="file" hidden />
          </Button>

          <Button
            variant="contained"
            component="button"
            type="submit"
            style={{ marginTop: "2rem" }}
          >
            Create movie
          </Button>
        </Box>
      </form>
    </Drawer>
  );
};

export default DrawerNewMovie;
