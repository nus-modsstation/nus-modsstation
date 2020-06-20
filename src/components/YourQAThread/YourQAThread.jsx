import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { materialStyles } from "../../styles/material.styles";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const componentStyles = makeStyles({
  item: {
    display: "flex",
    flexDirection: "column",
    background: "white",
    borderBottom: "0.5px solid rgba(0, 0, 0, 0.35)",
  },
});

export const YourQAThread = () => {
  
  return (
    <Box component={Paper} className={materialClasses.paper} mb="5px" height={0.45} width={1}>
      <Box width={1}>
        <Typography variant="button">MOD1001</Typography>
      </Box>
      <Grid
        container
        spacing={1}
        m="5px"
        p="5px"
        display="flex"
        justify="space-between"
        alignItems="center"
        width={1}
      >
        <Grid item md={9}>
          <Typography component="p" variant="body1">
            Task name
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Button size="small">
            <Typography variant="button">View</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
