import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const componentStyles = makeStyles({
  cardContent: {
    margin: "5px 0px",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  button: {
    textDecoration: "none",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      textDecoration: "none",
    },
  },
  groupPicture: {
    height: 50,
    width: 50,
    alignSelf: "flex-start",
    marginRight: 10,
  },
});

export const YourGroupCard = () => {
  const component = componentStyles();
  return (
    <Box width={1} component={Paper} mb="5px">
      <Box
        component={NavLink}
        style={{
          textDecoration: "none",
          color: "black",
          "&:focus, &:hover, &:visited, &:link, &:active": {
            textDecoration: "none",
            color: "black",
          },
        }}
        to="/virtual-group"
        p="12px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Typography variant="caption" align="left">
          MOD1001
        </Typography>
        <Box className={component.cardContent}>
          <Box component="img" className={component.groupPicture} />
          <Box height={1} maxWidth={0.75}>
            <Typography variant="body1" noWrap align="left">
              Group Name
            </Typography>
            <Box my="2px">
              <Typography component="p" variant="caption" align="left" noWrap>
                This is your group description. Feel free to include anything
                interesting about your group here.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
