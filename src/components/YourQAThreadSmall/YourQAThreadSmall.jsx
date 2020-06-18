import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { List, ListItem } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const componentStyles = makeStyles({
  root: {
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, .4)",
    borderRadius: 5,
    width: 332,
  },
});

const Thread = () => {
  return (
    <div>
      <ListItem button>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Typography variant="body1" noWrap>
              Task name
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="button">MOD1001</Typography>
          </Grid>
        </Grid>
      </ListItem>
    </div>
  );
};

export const YourQAThreadSmall = () => {
  const component = componentStyles();
  return (
    <div>
      <List className={component.root}>
        <Thread />
        <Thread />
      </List>
    </div>
  );
};
