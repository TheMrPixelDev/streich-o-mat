import { Autocomplete, Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { getSubjectMessages, isSubject, type Subject } from "../utils/utils";
import { useSubjects } from "../hooks/useSubjects";
import AddIcon from "@mui/icons-material/AddOutlined";
import { useGroups } from "../hooks/useGroups";

export const AddGroupCard = () => {
  const { subjects, setSubjects } = useSubjects();
  const groups = useGroups();
  const [subject, setSubject] = useState<Partial<Subject>>({});

  const handleAddSubject = () => {
    if (isSubject(subject, subjects)) {
      setSubjects([...subjects, subject]);
      setSubject({});
    } else {
      const messages = getSubjectMessages(subject, subjects);
      alert(messages.join("\n"));
    }
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Note hinzufügen" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              fullWidth
              variant="filled"
              value={subject.name ?? ""}
              label="Name"
              type="text"
              onChange={(event) => setSubject({ ...subject, name: event.target.value })}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              variant="filled"
              value={subject.ects ?? ""}
              label="ECTS"
              type="number"
              onChange={(event) => setSubject({ ...subject, ects: Number.parseInt(event.target.value) })}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              variant="filled"
              value={subject.grade ?? ""}
              label="Note"
              type="number"
              onChange={(event) => setSubject({ ...subject, grade: Number.parseFloat(event.target.value) })}
            />
          </Grid>
          <Grid size={6}>
            <Autocomplete
              options={groups}
              value={subject.group}
              onChange={(_, newValue) => setSubject({ ...subject, group: newValue ?? "" })}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Gruppe"
                  onChange={(event) => setSubject({ ...subject, group: event.target.value })}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Button fullWidth variant="contained" onClick={handleAddSubject} startIcon={<AddIcon />}>
              hinzufügen
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
