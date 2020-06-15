import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Card, CardMedia } from "@material-ui/core";
import { Button } from "@material-ui/core";

const componentStyles = makeStyles({
  card: {
    height: 175,
    width: 124,
    marginRight: 25,
    paddingBottom: 4,
  },
  cardContent: {
    margin: 8,
    overflow: "hidden",
  },
  groupPicture: {
    width: "inherit",
    height: 88,
  },
});

export const VirtualGroupCard = () => {
  const component = componentStyles();
  return (
    <div>
      <Card className={component.card}>
        <CardMedia component="img" className={component.groupPicture} />
        <div className={component.cardContent}>
          <Typography variant="body2" align="left">
            Group Name
          </Typography>
          <Typography variant="caption" component="p" align="left">
            This is the group description, where members may add anything
            interesting about their group.
          </Typography>
        </div>
      </Card>
    </div>
  );
};
