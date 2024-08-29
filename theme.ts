"use client";
import { createTheme } from "@mui/material/styles";
const primaryColor = "#00A85A";
const lightTheme = createTheme();

const darkTheme = createTheme({
  palette: { mode: "dark", primary: { main: primaryColor } },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent", // Omita el color de fondo azul
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "inherit", // Usa el borde heredado del tema
        },
      },
    },
  },
});

const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme;
