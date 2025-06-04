import { Button, Card, CardContent, Stack } from "@mui/material";
import { useStorage } from "../hooks/useStorage";

export const ActionBar = () => {
  const { loadFromLocalStorage, saveToLocalStorage } = useStorage();
  return (
    <Card>
      <CardContent>
        <Stack direction={"row"}>
          <Button color="success" onClick={saveToLocalStorage}>
            Speichern
          </Button>
          <Button color="info" onClick={loadFromLocalStorage}>
            Laden
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
