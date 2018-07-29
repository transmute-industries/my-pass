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

import AddDocument from './Dialog/AddDocument';

import {
  Image as ImageIcon,
  Work as WorkIcon,
  Comment as CommentIcon,
  DoneAll as DoneAllIcon,
  Warning as WarningIcon,
  AddBox
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

class FolderList extends React.Component {
  state = {
    dialogOpen: false
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List>
          <ListItem>
            <Avatar>
              <WorkIcon />
            </Avatar>
            <ListItemText primary="MAP Card" secondary="July 20, 2014" />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Add"
                onClick={() => {
                  this.setState({
                    dialogOpen: !this.state.dialogOpen
                  });
                }}
              >
                <AddBox />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <LinearProgress color="secondary" variant="determinate" value={75} />
        </List>

        <AddDocument open={this.state.dialogOpen} />
      </div>
    );
  }
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FolderList);
