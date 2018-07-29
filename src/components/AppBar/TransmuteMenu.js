import React, { Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import { BugReport, Code } from 'material-ui-icons';

import { history } from '../../store';

import { EventStoreFactory } from 'transmute-framework';

import eventStoreFactoryArtifact from '../../contracts/EventStoreFactory.json';

let transmuteConfig = require('../../transmute-config');

class TransmuteMenu extends Component {
  async componentWillMount() {
    const eventStoreFactory = new EventStoreFactory({
      eventStoreFactoryArtifact,
      ...transmuteConfig
    });
    await eventStoreFactory.init();
    this.setState({
      factoryAddress:
        eventStoreFactory.eventStoreFactoryContractInstance.address
    });
  }
  render() {
    return (
      <List>
        {/* <ListItem button onClick={() => history.push('/metamask')}>
          <ListItemIcon>
            <Code />
          </ListItemIcon>
          <ListItemText primary="Fund MetaMask" />
        </ListItem> */}

        <ListItem
          button
          onClick={() => {
            window.location.href =
              'https://github.com/transmute-industries/my-pass/issues';
          }}
        >
          <ListItemIcon>
            <BugReport />
          </ListItemIcon>
          <ListItemText primary="Bug Report" />
        </ListItem>

        <ListItem
          button
          onClick={() => {
            window.location.href =
              'https://github.com/transmute-industries/my-pass';
          }}
        >
          <ListItemIcon>
            <Code />
          </ListItemIcon>
          <ListItemText primary="Github" />
        </ListItem>
      </List>
    );
  }
}

export default TransmuteMenu;
