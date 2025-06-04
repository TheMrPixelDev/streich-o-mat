import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody } from "@mui/material";
import { useSubjectsInGroup } from "../hooks/useSubjectsInGroups";
import { SubjectRow } from "./SubjectRow";

export const GroupsAccordion = (props: { group: string }) => {
  const { group } = props;
  const subjects = useSubjectsInGroup(group);

  return (
    <Accordion>
      <AccordionSummary>{group}</AccordionSummary>
      <AccordionDetails>
        <Table>
          <TableBody>
            {subjects.map((subject) => (
              <SubjectRow subject={subject} key={subject.name} />
            ))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
};
