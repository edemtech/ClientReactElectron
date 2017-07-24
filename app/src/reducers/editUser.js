import { EDIT_USER } from '../actions/types';

const initialState = {
	status: 'none',
	editingUser: {}
};

export default (state = initialState, action = {}) => {
	switch(action.type) {
		case EDIT_USER:
			return{
				status: 'edited',
				editingUser: action.user
			};
		default: return state;
	}
}
