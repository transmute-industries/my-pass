import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import AppBar from '../AppBar';

import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import theme from '../../theme';

import transmuteConfig from '../../transmute-config';

import myPass from '../../store/my-pass';

import Camera from '../Camera'

const styles = {
  card: {
    maxWidth: 500
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  media: {
    height: 200
  }
};

class Debug extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps);
  }
  async componentWillMount() {
    console.log(myPass);
    myPass.listeners.auth();
  }

  render() {
    return (
      <AppBar>
        <Typography gutterBottom variant="headline" component="h1">
          This page helps test stuff.
        </Typography>

        <pre>{JSON.stringify(this.props.myPass, null, 2)}</pre>

        <Button
          size="small"
          variant={'raised'}
          color="primary"
          onClick={() => {
            myPass.actions.signIn();
          }}
        >
          Sign In
        </Button>

        <Button
          size="small"
          variant={'raised'}
          color="primary"
          onClick={() => {
            myPass.actions.signOut();
          }}
        >
          Sign Out
        </Button>

        <Camera/>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    myPass: state.myPass
  };
};

const mapDispatchToProps = dispatch => {
  return {
    go: somePath => dispatch(push(somePath))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Debug));
