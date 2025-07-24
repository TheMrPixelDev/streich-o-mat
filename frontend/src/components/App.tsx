import { useState } from "react";
import { SubjectContext, type Theme as MyTheme, ThemeContext } from "../contexts";
import type { Subject } from "../utils/utils";
import { GroupsContainer } from "./GroupsContainer";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [theme, setTheme] = useState<MyTheme>("LIGHT");

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={theme === "DARK" ? darkTheme : theme === "LIGHT" ? lightTheme : {}}>
        <CssBaseline />
        <SubjectContext.Provider value={{ subjects, setSubjects }}>
          <GroupsContainer />
        </SubjectContext.Provider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
