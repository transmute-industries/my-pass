import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import AppBar from '../AppBar';

import _ from 'lodash';

import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import theme from '../../theme';
import Grid from 'material-ui/Grid';
import transmuteConfig from '../../transmute-config';

import myPass from '../../store/my-pass';

import Camera from '../Camera';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import * as middleware from '../../store/my-pass/middleware';

import { newUserSession } from '../../store/my-pass/broadcast';
import { history } from '../../store';

import NewUserDialog from './Dialog/NewUser';
import ReturningUser from './Dialog/ReturningUser';
import { toast } from 'react-toastify';

const helpers = require('../../helpers');

const styles = {
  card: {
    maxWidth: 500
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  media: {
    // height: 200
    paddingTop: '56.25%' // 16:9
  }
};

const regResults = require('./regResults.json');

// newUserSession(regResults);

class Register extends Component {
  state = {
    // name: '',
    // pin: '',
    // imgData: ''
  };

  constructor(props) {
    super(props);
    if (this.props.myPass.user) {
      toast.success('Welcome back!');
      history.push('/profile');
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps);

    if (nextProps.myPass.user) {
      toast.success('Welcome back!');
      history.push('/profile');
    }
  }

  async componentWillMount() {
    // console.log(myPass);
    // myPass.listeners.auth();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  isRegisterEnabled = () => {
    return this.state.name && this.state.pin && this.state.imgData;
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar>
        <Grid container style={{ paddingBottom: 40 }}>
          <Grid item md={6} sm={12}>
            <Typography gutterBottom variant="headline" component="h1">
              Register to access your blockchain credits, and secured
              documents.
            </Typography>
          </Grid>
          <Grid item md={12} sm={12}>
            <Card className={classes.card}>
              <CardContent>
                <Camera
                  onCapture={imgData => {
                    this.setState({
                      imgData
                    });
                  }}
                />
                <TextField
                  label="Name"
                  placeholder="First"
                  onChange={this.handleChange('name')}
                  className={classes.textField}
                  margin="normal"
                />
                <br />
                <TextField
                  label="PIN"
                  placeholder="PIN Number"
                  type="password"
                  onChange={this.handleChange('pin')}
                  className={classes.textField}
                  margin="normal"
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant={'raised'}
                  color="primary"
                  disabled={!this.isRegisterEnabled()}
                  onClick={async () => {
                    // console.log(this.state);
                    helpers.blobToDataURL(this.state.imgData, async dataUri => {
                      // console.log(dataUri);
                      // let { data } = await middleware.register({
                      //   name: this.state.name,
                      //   pin: this.state.pin,
                      //   dataUri
                      // });

                      let data = regResults;

                      newUserSession(data);

                      this.setState({
                        dialogOpen: !this.state.dialogOpen,
                        registrationResults: {
                          ...data
                        },
                        isNewUser: data.isNewUser
                      });
                    });
                  }}
                >
                  Register
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {this.state.isNewUser ? (
          <NewUserDialog
            open={this.state.dialogOpen}
            registrationResults={this.state.registrationResults}
          />
        ) : (
          <ReturningUser
            open={this.state.dialogOpen}
            registrationResults={this.state.registrationResults}
          />
        )}
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
)(withStyles(styles)(Register));
