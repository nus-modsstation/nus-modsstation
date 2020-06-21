import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

import { VirtualGroupForm } from "../../components/VirtualGroupDialog/VirtualGroupForm";

const componentStyles = makeStyles((theme) => ({
  dialogTitleText: {
    display: "inline",
    padding: 0,
  },
  dialogTitleSection: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    alignItems: "center",
  },
}));

export const VirtualGroupDialog = ({ modulePage, module }) => {
  const theme = useTheme();
  const componentClasses = componentStyles();
  const screenSmall = useMediaQuery(theme.breakpoints.down("xs"));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {screenSmall ? (
        <IconButton onClick={handleClickOpen}>
          <AddCircleRoundedIcon style={{ fontSize: 44 }} />
        </IconButton>
      ) : (
        <Button
          fullWidth
          size="small"
          variant="contained"
          onClick={handleClickOpen}
        >
          Create
        </Button>
      )}
      <Dialog
        pb="10px"
        open={open}
        onClose={handleClose}
        fullScreen={screenSmall}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <Box className={componentClasses.dialogTitleSection}>
          <DialogTitle
            className={componentClasses.dialogTitleText}
            id="form-dialog-title"
          >
            Create Virtual Group
          </DialogTitle>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <div style={{ overflow: "hidden", height: "100%", width: "100%" }}>
            <div
              style={{
                margin: 10,
                height: "100%",
                width: "100%",
                boxSizing: "content-box",
              }}
            >
              <VirtualGroupForm modulePage={modulePage} module={module} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
