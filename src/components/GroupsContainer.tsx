import { Container, Stack, Typography } from "@mui/material";
import { useGroups } from "../hooks/useGroups";
import { GroupsAccordion } from "./GroupAccordion";
import { useSubjects } from "../hooks/useSubjects";
import { AddGroupCard } from "./AddGroupCard";
import { GradeCard } from "./GradeCard";
import { useEffect } from "react";
import { mockdata } from "../utils/mockdata";
import { ActionBar } from "./ActionBar";

export const GroupsContainer = () => {
  const { setSubjects } = useSubjects();
  const groups = useGroups();

  useEffect(() => {
    setSubjects(mockdata);
  }, []);

  return (
    <Container>
      <Stack direction={"column"} spacing={3}>
        <Typography variant="h3">Streich-O-Mat</Typography>
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
