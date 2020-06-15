import React, { Component } from "react";
import { theme } from "../../styles/material.styles";
import { NavLink } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import { VirtualGroupCard } from "../../components/VirtualGroupCard/VirtualGroupCard";
import { Box } from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Collapse } from "@material-ui/core";

const componentStyles = makeStyles({
  item: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
  },
  itemHeader: {
    display: "flex",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  itemHeaderLeft: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemContent: {
    margin: "10px 0px",
    paddingBottom: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    "&::-webkit-scrollbar": {
      height: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      borderRadius: 8,
      background: '#421cf8',
    },
  },
});

export const VirtualGroupModule = () => {
  const component = componentStyles();
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      className={component.item}
      width={1}
      maxHeight={0.5}
      alignItems="flex-start"
    >
      <div className={component.itemHeader}>
        <div className={component.itemHeaderLeft}>
          <IconButton onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <Button component={NavLink} to="/virtual-group-module">
            <Typography variant="body1">MOD1001</Typography>
          </Button>
      </div>
        </div>
      <Box width={1}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box overflow="auto" className={component.itemContent}>
            <VirtualGroupCard />
            <VirtualGroupCard />
            <VirtualGroupCard />
            <VirtualGroupCard />
            <VirtualGroupCard />
            <VirtualGroupCard />
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};
