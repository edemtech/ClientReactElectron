import { EDIT_USER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
	editingUser: {}
};

export default (state = initialState, action = {}) => {
	switch(action.type) {
		case EDIT_USER:
			return{
				editingUser: action.editingUser
			};
		default: return state;
	}
}
