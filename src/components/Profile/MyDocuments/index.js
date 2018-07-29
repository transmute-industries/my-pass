import React, { Component } from 'react';

// import Button from 'material-ui/Button';

// const style = {

// };

import Typography from 'material-ui/Typography';

import InProgress from './InProgress';
import MyVault from './MyVault';

export default class MyDocs extends Component {
  render() {
    return (
      <div>
        <Typography gutterBottom variant="headline" component="h1">
          In Progress
        </Typography>
        <InProgress />
        <br />
        <Typography gutterBottom variant="headline" component="h2">
          My Vault
        </Typography>

        <MyVault />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
