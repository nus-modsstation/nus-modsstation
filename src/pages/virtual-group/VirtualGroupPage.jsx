import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { materialStyles } from "../../styles/material.styles";
import { Grid } from "@material-ui/core";
import { Hidden } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { InputBase } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Popper } from "@material-ui/core";
import { ClickAwayListener } from "@material-ui/core";

import { YourGroupsSmall } from "../../components/YourVirtualGroupsSmall/YourVirtualGroupsSmall";
import { VirtualGroupModule } from "../../components/VirtualGroupModule/VirtualGroupModule";
import { YourGroupCard } from "../../components/YourVirtualGroupCard/YourVirtualGroupCard";

const recruitingGroupStyles = makeStyles({
  header: {
    margin: "10px 0px",
  },
  list: {
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: 488,
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const yourGroupStyles = makeStyles({
  list: {
    overflow: "auto",
    alignItems: "flex-start",
    flexDirection: "column",
    height: 400,
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  header: {
    margin: "34px 20px 10px 20px",
  },
});

export const VirtualGroupPage = () => {
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
        <Grid item md={8} xs={12}>
          <Hidden mdUp>
            <Popper open={open} anchorEl={anchorEl} placement="bottom">
              <YourGroupsSmall />
            </Popper>
          </Hidden>
          <Grid
            container
            className={recruitingGroups.header}
            justify="space-between"
          >
            <Grid item xs={12}>
              <Typography variant="h6" align="left">
                RECRUITING GROUPS
              </Typography>
            </Grid>
            <Hidden mdUp>
              <Grid item xs={12} justify="flex-end">
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
              </Grid>
            </Hidden>
          </Grid>
          <Box component="form" className={styles.searchBar}>
            <InputBase
              className={styles.fix}
              placeholder="Search module or group"
            />
            <IconButton size="small" disableRipple>
              <Search />
            </IconButton>
          </Box>
          <Box width={1} className={recruitingGroups.list} disablePadding>
            <VirtualGroupModule />
            <VirtualGroupModule />
            <VirtualGroupModule />
            <VirtualGroupModule />
            <VirtualGroupModule />
          </Box>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}>
            <Box className={yourGroups.header}>
              <Typography variant="h6" align="center">
                Your groups
              </Typography>
            </Box>
            <Box className={yourGroups.list}>
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
