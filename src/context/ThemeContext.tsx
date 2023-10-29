import { createContext } from "react";

export type ThemeContextType = "light" | "dark";

export const ThemeContext = createContext<ThemeContextType>("light");

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
