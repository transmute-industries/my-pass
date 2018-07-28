import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import AppBar from '../AppBar';


import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import theme from '../../theme';

import { history } from '../../store';

import man from '../../images/man5.jpg';

const styles = {
  card: {
    maxWidth: 500
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
};

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={man}
            title="American Man"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              MyPass
            </Typography>
            <Typography component="p">
              Soverign Idenitity for Urban Survivors.... 
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant={'raised'}
              color="primary"
              onClick={() => {
                history.push('/demo');
              }}
            >
              Secure Messaging
            </Button>
          </CardActions>
        </Card>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    go: somePath => dispatch(push(somePath))
    // setWeb3Account: async web3Account => {
    //   dispatch(actionsCreators.setWeb3Account(web3Account));
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
