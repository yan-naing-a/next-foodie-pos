import type { ThemeMode } from "@/store/slices/themeSlice";
import { createTheme } from "@mui/material/styles";

const createAppTheme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === "dark" ? "#0f172a" : "#f5f5f5",
        paper: mode === "dark" ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#111827",
        secondary: mode === "dark" ? "#ffffff" : "#6B7280",
      },
      primary: {
        main: mode === "dark" ? "#8ab4f8" : "#4C4C6D",
      },
      secondary: {
        main: mode === "dark" ? "#facc15" : "#FFE194",
      },
      info: {
        main: mode === "dark" ? "#dbeafe" : "#E8F6EF",
      },
      success: {
        main: mode === "dark" ? "#1e293b" : "#1B9C85",
      },
    },
  });

export const themes = {
  light: createAppTheme("light"),
  dark: createAppTheme("dark"),
};
