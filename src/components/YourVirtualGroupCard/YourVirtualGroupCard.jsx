import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

const componentStyles = makeStyles({
  card: {
    padding: 0,
    display: 'flex',
    background: '#FAFAFA',
    borderBottom: '0.5px solid rgba(0, 0, 0, 0.35)',
    height: 175,
  },
  cardContent: {
    flex: 1,
    height: 84,
    width: 188,
    overflow: 'hidden',
  },
  groupPicture: {
    height: 50,
    width: 50,
    alignSelf: 'flex-start',
    marginTop: 32,
  },
});

export const YourGroupCard = () => {
  const component = componentStyles();
  return (
    <div>
      <ListItem component={Card} height={1 / 3} className={component.card}>
        <div>
          <CardContent className={component.cardContent}>
            <Typography variant="button">MOD1001</Typography>
            <Typography variant="h6" noWrap>
              Group Name 00000000000000000000000000000000001
            </Typography>
            <Typography component="p" variant="caption">
              This is your group description. Feel free to include anything
              interesting about your group here.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Typography variant="button">View</Typography>
            </Button>
          </CardActions>
        </div>
        <CardMedia component="img" className={component.groupPicture} />
      </ListItem>
    </div>
  );
};
