import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody, Typography } from "@mui/material";
import { useSubjectsInGroup } from "../hooks/useSubjectsInGroups";
import { SubjectRow } from "./SubjectRow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const GroupsAccordion = (props: { group: string }) => {
  const { group } = props;
  const subjects = useSubjectsInGroup(group);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={"bold"}>{group}</Typography>
      </AccordionSummary>
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
