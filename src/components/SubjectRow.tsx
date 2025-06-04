import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { useSubjects } from "../hooks/useSubjects";
import type { Subject } from "../utils/utils";
import DeleteIcon from "@mui/icons-material/Delete";

export const SubjectRow = (props: { subject: Subject }) => {
  const { subject } = props;
  const { subjects, setSubjects } = useSubjects();

  const handleDelete = () => {
    setSubjects(subjects.filter((s) => s.name !== subject.name));
  };

  return (
    <TableRow>
      <TableCell>{subject.name}</TableCell>
      <TableCell>{subject.ects}</TableCell>
      <TableCell>{subject.grade}</TableCell>
      <TableCell>
        <Tooltip title="Löschen">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
