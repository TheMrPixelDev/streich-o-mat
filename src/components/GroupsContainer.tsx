import { Container, IconButton, Stack, Typography } from "@mui/material";
import { useGroups } from "../hooks/useGroups";
import { GroupsAccordion } from "./GroupAccordion";
import { useSubjects } from "../hooks/useSubjects";
import { AddGroupCard } from "./AddGroupCard";
import { GradeCard } from "./GradeCard";
import { useEffect } from "react";
import { mockdata } from "../utils/mockdata";
import { ActionBar } from "./ActionBar";
import LightIcon from "@mui/icons-material/LightMode";
import DarkIcon from "@mui/icons-material/DarkMode";
import { useMyTheme } from "../hooks/useMyTheme";

export const GroupsContainer = () => {
  const { setSubjects } = useSubjects();
  const groups = useGroups();
  const { setTheme, theme } = useMyTheme();

  useEffect(() => {
    setSubjects(mockdata);
  }, []);

  return (
    <Container>
      <Stack direction={"column"} spacing={3} marginTop={3}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h3">Streich-O-Mat</Typography>
          <IconButton
            onClick={() => {
              if (theme === "DARK") {
                setTheme("LIGHT");
              } else {
                setTheme("DARK");
              }
            }}
          >
            {theme === "DARK" ? <LightIcon /> : <DarkIcon />}
          </IconButton>
        </Stack>
        <ActionBar />
        <AddGroupCard />
        <GradeCard />
        {groups.map((group) => (
          <GroupsAccordion group={group} key={group} />
        ))}
      </Stack>
    </Container>
  );
};
