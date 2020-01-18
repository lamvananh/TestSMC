import produce from 'immer';
import { LOGIN_ERROR,LOGIN_SUCCESS } from './constants';


// The initial state of the App
export const initialState = {
  currentUser: {token:'testtt',id:'',name:'',avatarUrl:'',  error:''},
  error:""
};

const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_ERROR:
       // draft.currentUser.error = action.error.message;
       draft.currentUser = {id:"1",token: "TKABC", name: "Admin",avatarUrl:'',error:''};// for test
        break;
      case LOGIN_SUCCESS:
        //draft.currentUser = {id:action.data.id,token: action.data.token, name: action.data.userName,error:''};
        draft.currentUser = {id:"1",token: "TKABC", name: "Admin",avatarUrl:'',error:''};// for test
        break;
    }
  });

export default loginReducer;
