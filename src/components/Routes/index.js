import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../Home';

import Debug from '../Debug';
import Register from '../Register';
import Profile from '../Profile';

import MetaMask from '../MetaMask';

import MessagesPage from '../Messages';

import { ToastContainer } from 'react-toastify';

class Routes extends React.Component {
  render() {
    return (
      <div>
        <ToastContainer />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/metamask" component={MetaMask} />
          <Route path="/debug" component={Debug} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/messages" exact render={() => <MessagesPage />} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
