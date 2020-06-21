import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Hidden } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Popper } from "@material-ui/core";
import { ClickAwayListener } from "@material-ui/core";

import { Searchbar } from "../../../components/Searchbar/Searchbar";
import { materialStyles } from "../../../styles/material.styles";
import { YourGroupsSmall } from "../../../components/YourVirtualGroupsSmall/YourVirtualGroupsSmall";
import { VirtualGroupCard } from "../../../components/VirtualGroupCard/VirtualGroupCard";
import { YourGroupCard } from "../../../components/YourVirtualGroupCard/YourVirtualGroupCard";
import { StudyGroup } from "../../../models/StudyGroup";
import { VirtualGroupDialog } from "../../../components/VirtualGroupDialog/VirtualGroupDialog";

const recruitingGroupStyles = makeStyles({
  header: {
    margin: "10px 0px",
    paddingRight: 0,
    flexDirection: "row",
  },
  list: {
    overflow: "auto",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const yourGroupStyles = makeStyles({
  list: {
    height: 432,
    overflow: "auto",
    alignItems: "flex-start",
    flexDirection: "column",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const VirtualGroupModulePage = () => {
  const styles = materialStyles();
  const recruitingGroups = recruitingGroupStyles();
  const yourGroups = yourGroupStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <Box className={styles.root}>
      <Grid container spacing={4} justify="space-between">
        <Grid item md={9} xs={12}>
          <Hidden mdUp>
            <Popper
              open={open}
              anchorEl={anchorEl}
              display
              placement="bottom-end"
            >
              <YourGroupsSmall />
            </Popper>
          </Hidden>
          <Typography variant="h4" align="center">
            MOD1001
          </Typography>
          <Hidden mdUp>
            <Box width={1} my="4px">
              <ClickAwayListener onClickAway={handleClickAway}>
                <Button
                  onClick={handleClick}
                  variant="outlined"
                  fullWidth
                  size="small"
                >
                  <Typography variant="button">Your groups</Typography>
                </Button>
              </ClickAwayListener>
            </Box>
          </Hidden>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justify="space-between"
          >
            <Grid item xs={10} md={11}>
              <Searchbar searchOptions={StudyGroup.searchOptions} />
            </Grid>
            <Grid item xs={2} md={1}>
              <VirtualGroupDialog modulePage module={{ id: "MOD1001", name: "Test Module" }} />
            </Grid>
          </Grid>
          <Box className={recruitingGroups.list} width={1}>
            <VirtualGroupCard modulePage />
            <VirtualGroupCard modulePage />
            <VirtualGroupCard modulePage />
            <VirtualGroupCard modulePage />
            <VirtualGroupCard modulePage />
            <VirtualGroupCard modulePage />
            <VirtualGroupCard modulePage />
            <VirtualGroupCard modulePage />
            <VirtualGroupCard modulePage />
            <VirtualGroupCard modulePage />
          </Box>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}>
            <Box my="8px">
              <Typography variant="h6" align="center">
                Your groups
              </Typography>
            </Box>
            <Box width={1} className={yourGroups.list}>
              <YourGroupCard />
              <YourGroupCard />
              <YourGroupCard />
              <YourGroupCard />
              <YourGroupCard />
              <YourGroupCard />
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
};
