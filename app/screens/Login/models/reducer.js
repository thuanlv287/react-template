import produce from 'immer';
import actionTypes from './actionTypes';
export const initialState = {
  message: '',
  user: {},
  isLoading: false
}

export default (state = initialState, action) =>
produce(state, draft => {
  switch (action.type) {
    case actionTypes.GET_LOGIN:
      draft.message = '';
      draft.isLoading = true;
      break;
    case actionTypes.GET_LOGIN_SUCCESS:
      draft.message = action.payload.data.message;
      draft.isLoading = false;
      draft.user = action.payload.data;
      break;
  }
});