import { Card, CardContent, CardHeader, Divider, Grid, List, ListItem, Stack, Typography } from "@mui/material";
import { useGradesOfCombinations } from "../hooks/useGradesOfCombinations";
import React from "react";

export const GradeCard = () => {
  const combinations = useGradesOfCombinations() ?? [];

  const bestCombination = combinations.length > 0 ? combinations[0] : undefined;

  if (combinations.length === 0) {
    return <Typography>Noch nichts berechenbar. Bitte füge zuerst mindestens eine Note hinzu.</Typography>;
  }

  const formattedTotalGrade = bestCombination && Math.round(bestCombination?.totalGrade * 100) / 100;

  return (
    <Card variant="outlined">
      <CardHeader title="Beste Variante" />
      <CardContent>
        <Grid container>
          <Grid size={{ lg: 6, xs: 12 }} alignItems={"center"} display={"flex"} justifyContent={"center"}>
            <Stack alignItems={"center"}>
              <Typography>Gesamtnote</Typography>
              <Typography variant="h2">
                {formattedTotalGrade !== undefined && !isNaN(formattedTotalGrade) ? formattedTotalGrade : "-"}
              </Typography>
            </Stack>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Stack alignItems={"center"}>
              <Typography>zu streichende Noten</Typography>
              <List>
                {bestCombination !== undefined && bestCombination.combination.length > 0 ? (
                  bestCombination.combination.map((subject) => (
                    <React.Fragment key={subject.name}>
                      <ListItem>
                        <Typography>{subject.name}</Typography>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))
                ) : (
                  <Typography variant="h2">-</Typography>
                )}
              </List>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
