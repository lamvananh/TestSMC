import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUser = state =>{
  return state.login || initialState;
} 
const selectError = state => state.error || initialState.currentUser.error;


const makeSelectCurrentUser = () =>{
 return createSelector(
    selectUser,
    userState => userState.currentUser,
  );
}
const makeSelectError = () =>{

 return createSelector(
   selectError,
    errorState => errorState,
  );
}

export { makeSelectCurrentUser,makeSelectError };
