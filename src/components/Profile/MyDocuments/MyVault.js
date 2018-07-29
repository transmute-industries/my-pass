import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import ListItemText from 'material-ui/List/ListItemText';
import ListItemSecondaryAction from 'material-ui/List/ListItemSecondaryAction';
import Avatar from 'material-ui/Avatar';
import LinearProgress from 'material-ui/Progress/LinearProgress';
import IconButton from 'material-ui/IconButton';

import red from 'material-ui/colors/red';


import {
  Image as ImageIcon,
  Work as WorkIcon,
  Comment as CommentIcon,
  DoneAll as DoneAllIcon,
  Warning as WarningIcon
} from 'material-ui-icons';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  cssRoot: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700]
    }
  }
});

function FolderList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Avatar>
            <ImageIcon />
          </Avatar>
          <ListItemText primary="APD ID" secondary="Jan 9, 2014" />
          <ListItemSecondaryAction>
            <IconButton aria-label="Comments">
              <DoneAllIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <Avatar>
            <WorkIcon />
          </Avatar>
          <ListItemText
            primary="Drivers License"
            secondary="Expired Jan 7, 2014"
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Warning" className={classes.cssRoot}>
              <WarningIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FolderList);
