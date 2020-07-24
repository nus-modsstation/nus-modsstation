import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { visitQAThread } from '../../redux/qaThread/qaThread.action';
import { readDocument } from '../../services/firestore';
import { readRecentMessages } from '../../services/messages';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Card, CardActions } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';

const componentStyles = makeStyles({
  card: {
    height: 200,
    width: 175,
    marginRight: 25,
    marginBottom: 5,
    // orange: QA threads
    backgroundColor: 'rgba(250, 190, 88, 0.3)',
  },
  cardContent: {
    margin: 8,
    overflow: 'hidden',
    padding: 8,
  },
  listItem: {
    marginBottom: 10,
    padding: 8,
    // orange: QA threads
    backgroundColor: 'rgba(250, 190, 88, 0.3)',
  },
  listItemContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const ThreadPortraitCard = ({ thread, currentUser, visitThread }) => {
  const componentClasses = componentStyles();
  const [mostRecentMessage, setRecentMessage] = React.useState(null);

  const visit = async () => {
    if (currentUser.id !== thread.ownerId) {
      // store the thread to a temporary state
      // so that the chat room page can fetch the thread
      // to get chat room data
      visitThread(thread);
    }
  };

  useEffect(() => {
    let mounted = true;
    readRecentMessages({
      id: thread.id,
      size: 1,
      callback: async (snapshot) => {
        let messageData = [];
        if (snapshot.val() !== null) {
          messageData = Object.values(snapshot.val());
          if (messageData.length > 0) {
            const message = messageData[0].message;
            const writerId = messageData[0].userId;
            const user = await readDocument({
              collection: 'users',
              docId: writerId,
            });
            if (mounted) {
              setRecentMessage({ writer: user.username, message: message });
            }
          }
        }
      },
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Card variant="outlined" className={componentClasses.card}>
      <Box
        width={1}
        className={componentClasses.cardContent}
        height={0.65}
        m="5px"
      >
        <Box textOverflow="ellipsis">
          <Typography variant="body1">
            <strong>{thread.taskName}</strong>
          </Typography>
        </Box>
        <Box overflow="hidden" pr={1}>
          <Typography component="p" variant="caption">
            {mostRecentMessage
              ? mostRecentMessage.writer + ': ' + mostRecentMessage.message
              : 'Wow, much empty'}
          </Typography>
        </Box>
      </Box>
      <CardActions disableSpacing>
        <Button
          component={Link}
          onClick={visit}
          to={`/chat-room/${thread.id}`}
          fullWidth
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

const ThreadLandscapeCard = ({ thread, currentUser, visitThread }) => {
  const componentClasses = componentStyles();
  const [mostRecentMessage, setRecentMessage] = React.useState(null);

  const visit = async () => {
    if (currentUser.id !== thread.ownerId) {
      visitThread(thread);
    }
  };

  useEffect(() => {
    let mounted = true;
    readRecentMessages({
      id: thread.id,
      size: 1,
      callback: async (snapshot) => {
        let messageData = [];
        if (snapshot.val() !== null) {
          messageData = Object.values(snapshot.val());
          if (messageData.length > 0) {
            const message = messageData[0].message;
            const writerId = messageData[0].userId;
            const user = await readDocument({
              collection: 'users',
              docId: writerId,
            });
            if (mounted) {
              setRecentMessage({ writer: user.username, message: message });
            }
          }
        }
      },
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Box component={Paper} className={componentClasses.listItem}>
      <Grid container alignItems="center" spacing={1} justify="space-between">
        <Grid item xs={8} md={9}>
          <Box width={1} pl={1} className={componentClasses.listItemContent}>
            <Box width={1}>
              <Typography variant="body1">
                <strong>{thread.taskName}</strong>
              </Typography>
            </Box>
            <Box width={1}>
              <Typography variant="caption" component="p" noWrap>
                {mostRecentMessage
                  ? mostRecentMessage.writer + ': ' + mostRecentMessage.message
                  : 'Wow, much empty'}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3} md={1}>
          <Button
            component={Link}
            onClick={visit}
            to={`/chat-room/${thread.id}`}
            size="small"
            fullWidth
          >
            View
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const QAThreadCardComponent = ({
  modulePage,
  thread,
  currentUser,
  visitThread,
}) => {
  return (
    <div>
      {modulePage ? (
        <ThreadLandscapeCard
          thread={thread}
          currentUser={currentUser}
          visitThread={visitThread}
        />
      ) : (
        <ThreadPortraitCard
          thread={thread}
          currentUser={currentUser}
          visitThread={visitThread}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  visitThread: (thread) => dispatch(visitQAThread(thread)),
});

export const QAThreadCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(QAThreadCardComponent);
