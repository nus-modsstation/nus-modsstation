import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Card, CardMedia } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

const componentStyles = makeStyles((theme) => ({
  flexCard: {
    [theme.breakpoints.down("xs")]: {
      height: 164,
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      height: 200,
      width: 178,
    },
    marginRight: 25,
    marginBottom: 15,
    padding: 8,
  },
  card: {
    height: 200,
    width: 175,
    marginRight: 25,
    marginBottom: 5,
    padding: 8,
  },
  box: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
  },
  groupPicture: {
    width: 50,
    height: 50,
  },
}));

export const VirtualGroupCard = ({ modulePage }) => {
  const component = componentStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div>
      <Card
        variant="outlined"
        className={modulePage ? component.flexCard : component.card}
      >
        <Box
          height={1}
          width={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box
            maxHeight={modulePage ? (xs ? 0.72 : 0.66) : 0.66}
            overflow="hidden"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box mr="8px">
              <CardMedia
                component="img"
                className={component.groupPicture}
              />
            </Box>
            <Box width={1} p="4px" mb="4px">
              <Typography
                variant={modulePage ? (xs ? "body1" : "body2") : "body2"}
                align="center"
                noWrap
              >
                Group Name
              </Typography>
            </Box>
            <Box width={1} px="4px" height="auto" overflow="hidden">
              <Typography variant="caption" component="p" align="center">
                This is the group description, where members may add anything
                interesting about their group. This is the group description,
                where members may add anything interesting about their group.
              </Typography>
            </Box>
          </Box>
          <Button fullWidth>Join</Button>
        </Box>
      </Card>
    </div>
  );
};
