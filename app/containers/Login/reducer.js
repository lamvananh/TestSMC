import produce from 'immer';
import { LOGIN_ERROR,LOGIN_SUCCESS } from './constants';

// The initial state of the App
export const initialState = {
  currentUser: {token:'',name:'',  error:''},
  error:""
};

const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_ERROR:
        draft.currentUser.error = action.error.message;
        draft.error =  "EEEEEEEEEEEEEEEEE";
        break;
      case LOGIN_SUCCESS:
        draft.currentUser = {token: action.data.token, name: action.data.userName,error:''};
        break;
    }
  });

export default loginReducer;
