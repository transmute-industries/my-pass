import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import AppBar from '../AppBar';

import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import theme from '../../theme';

import transmuteConfig from '../../transmute-config';

import MyDocs from './MyDocuments';


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

const Web3 = require('web3');

let providerUrl = transmuteConfig.web3Config.providerUrl;
const ganacheWeb3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

const getAccounts = someWeb3 => {
  return new Promise((resolve, reject) => {
    someWeb3.eth.getAccounts(async (err, accounts) => {
      if (err) {
        reject(err);
      } else {
        resolve(accounts);
      }
    });
  });
};
const getBalance = (someWeb3, someAddress) => {
  return new Promise((resolve, reject) => {
    someWeb3.eth.getBalance(someAddress, (err, balance) => {
      if (err) {
        reject(err);
      } else {
        resolve(balance.toNumber());
      }
    });
  });
};

const fundAccount = async (amountETH, fromAddress, toAddress, providerUrl) => {
  const ganacheWeb3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
  let receipt = await ganacheWeb3.eth.sendTransaction({
    from: fromAddress,
    to: toAddress,
    value: ganacheWeb3.toWei(amountETH, 'ether'),
    gasLimit: 21000,
    gasPrice: 20000000000
  });

  console.log(receipt);
};
class Profile extends Component {
  async componentWillMount() {
    let myAddress = this.props.myPass.session.userProfile.address;

    let defaultAccounts = await getAccounts(ganacheWeb3);
    let myBalance = await getBalance(ganacheWeb3, myAddress);
    if (myBalance === 0) {
      await fundAccount(
        1,
        defaultAccounts[0],
        myAddress,
        transmuteConfig.web3Config.providerUrl
      );
    }

    this.setState({
      balance: myBalance
    });
  }

  render() {
    return (
      <AppBar>
        <Typography gutterBottom variant="headline" component="h1">
          Your Ethereum Account
        </Typography>
        <pre>
          {JSON.stringify(
            { ...this.state, ...this.props.myPass.session.userProfile },
            null,
            2
          )}
        </pre>{' '}
        <MyDocs />
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
)(withStyles(styles)(Profile));
