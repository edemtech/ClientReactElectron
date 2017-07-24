import { combineReducers } from 'redux';
import { routerMiddleware, routerReducer as routing, push } from 'react-router-redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import edit from './reducers/editUser';
import table from './reducers/table';

export default combineReducers({
	flashMessages,
	auth,
	table,
	edit,
	routing,
});
