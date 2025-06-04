import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
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
        <Grid container spacing={2}>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Button fullWidth color="success" onClick={exportToFile} variant="contained" startIcon={<DownloadIcon />}>
              Speichern
            </Button>
          </Grid>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Button fullWidth color="info" onClick={importFromFile} variant="contained" startIcon={<ImportIcon />}>
              Laden
            </Button>
          </Grid>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Button fullWidth color="error" onClick={resetData} variant="contained" startIcon={<ResetIcon />}>
              ZURÜCKSETZEN
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
