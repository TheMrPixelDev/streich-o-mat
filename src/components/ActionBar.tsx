import { Button, Card, CardContent, CardHeader, Stack } from "@mui/material";
import { useStorage } from "../hooks/useStorage";
import DownloadIcon from "@mui/icons-material/Download";
import ImportIcon from "@mui/icons-material/ImportExport";
import ResetIcon from "@mui/icons-material/Delete";

export const ActionBar = () => {
  const { resetData, exportToFile, importFromFile } = useStorage();
  return (
    <Card variant="outlined">
      <CardHeader title="Aktionen" />
      <CardContent>
        <Stack direction={"row"} spacing={2}>
          <Button color="success" onClick={exportToFile} variant="contained" startIcon={<DownloadIcon />}>
            Speichern
          </Button>
          <Button color="info" onClick={importFromFile} variant="contained" startIcon={<ImportIcon />}>
            Laden
          </Button>
          <Button color="error" onClick={resetData} variant="contained" startIcon={<ResetIcon />}>
            ZURÜCKSETZEN
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
