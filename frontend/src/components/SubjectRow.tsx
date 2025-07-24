import { IconButton, TableCell, TableRow, TextField, Tooltip } from "@mui/material";
import { useSubjects } from "../hooks/useSubjects";
import type { Subject } from "../utils/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

export const SubjectRow = (props: { subject: Subject }) => {
  const { subject } = props;
  const { subjects, setSubjects } = useSubjects();
  const [editSubject, setEditSubject] = useState<{ subject: Subject; subjectIdx: number } | undefined>(undefined);

  const handleDelete = () => {
    setSubjects(subjects.filter((s) => s.name !== subject.name));
  };

  if (editSubject !== undefined) {
    return (
      <TableRow>
        <TableCell width={"60%"}>
          <TextField
            fullWidth
            variant="filled"
            size="small"
            value={editSubject.subject.name}
            onChange={(event) =>
              setEditSubject({ ...editSubject, subject: { ...editSubject.subject, name: event.target.value } })
            }
            label="Name"
          />
        </TableCell>
        <TableCell width={"10%"}>
          <TextField
            fullWidth
            variant="filled"
            size="small"
            value={editSubject.subject.ects}
            type="number"
            onChange={(event) =>
              setEditSubject({
                ...editSubject,
                subject: { ...editSubject.subject, ects: Number.parseInt(event.target.value) },
              })
            }
            label="ECTS"
          />
        </TableCell>
        <TableCell width={"10%"}>
          <TextField
            value={editSubject.subject.grade}
            fullWidth
            variant="filled"
            type="number"
            size="small"
            onChange={(event) =>
              setEditSubject({
                ...editSubject,
                subject: { ...editSubject.subject, grade: Number.parseFloat(event.target.value) },
              })
            }
            label="Note"
          />
        </TableCell>
        <TableCell>
          <IconButton
            onClick={() => {
              const newSubjects = [...subjects];
              newSubjects[editSubject.subjectIdx] = editSubject.subject;
              setSubjects(newSubjects);
              setEditSubject(undefined);
            }}
          >
            <SaveIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton onClick={() => setEditSubject(undefined)}>
            <CancelIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell width={"60%"}>{subject.name}</TableCell>
      <TableCell width={"10%"}>{subject.ects}</TableCell>
      <TableCell width={"10%"}>{subject.grade}</TableCell>
      <TableCell width={"10%"}>
        <Tooltip title="Löschen">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title="Bearbeiten">
          <IconButton
            onClick={() => setEditSubject({ subject, subjectIdx: subjects.findIndex((s) => s.name === subject.name) })}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
