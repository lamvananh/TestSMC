import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUser = state =>{
  console.log("initialState..........",state,initialState.currentUser);
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
  console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
 return createSelector(
   selectError,
    errorState => errorState,
  );
}

export { makeSelectCurrentUser,makeSelectError };
