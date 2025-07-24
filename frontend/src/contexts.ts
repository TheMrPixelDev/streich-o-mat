import { createContext } from "react";
import type { Subject } from "./utils/utils";

export const SubjectContext = createContext<{ subjects: Subject[]; setSubjects: (s: Subject[]) => void }>({
  subjects: [],
  setSubjects: () => void 0,
});

export type Theme = "LIGHT" | "DARK";

export const ThemeContext = createContext<{ theme: Theme; setTheme: (theme: Theme) => void }>({
  setTheme: () => void 0,
  theme: "LIGHT",
});
