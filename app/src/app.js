import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
//import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';
import routes from './routes';

/*
const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);
*/

const initialState = {};
const store = configureStore(initialState);
const routerHistory = syncHistoryWithStore(hashHistory, store);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

if (localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}
//store.subscribe(() => {console.log( store.getState()) });
ReactDOM.render(
  <Provider store={store}>
    <Router history={routerHistory} routes={routes} />
  </Provider>,
  rootElement
);
