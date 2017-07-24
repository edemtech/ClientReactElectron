import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const router = routerMiddleware(hashHistory);

const actionCreators = {
  // ...authActions
};
const middlewares = [ thunk, router ];
const composeEnhancers = (() => {
  const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  if(process.env.NODE_ENV === 'development' && compose_) {
    return compose_({ actionCreators });
  }
  return compose;
})();

export default function configureStore(initialState) {
  const enhancer = composeEnhancers(applyMiddleware(...middlewares), persistState());
  const store = createStore(rootReducer, initialState, enhancer)

  return store
}
