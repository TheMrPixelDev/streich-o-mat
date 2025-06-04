import { useContext } from "react";
import { ThemeContext } from "../contexts";

export const useMyTheme = () => {
  return useContext(ThemeContext);
};
