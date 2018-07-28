import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { combineReducers } from 'redux';

import directory from './transmute/directory';

import myPass from './my-pass';

import { init } from './transmute/helpers';

import { routerReducer, routerMiddleware } from 'react-router-redux';

export const history = createHistory();

const middleware = [routerMiddleware(history), thunk, logger];

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

export const store = createStore(
  combineReducers({
    directory: directory.reducer,
    myPass: myPass.reducer,

    router: routerReducer
  }),
  composeEnhancers(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);

// check transmute dependencies...
init(store);
