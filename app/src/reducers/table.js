import { LOAD_TABLE } from '../actions/types';

const initialState = {
  tag: 'working table reducer!',
  tableData: []
};

export default (state = initialState, action = []) => {
	switch(action.type) {
		case LOAD_TABLE:
			return {
        tag: 'table getted',
				tableData: action.payload
			};
		default: return state;
	}
}
