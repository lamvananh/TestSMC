import produce from 'immer';
import { CHANGE_MENU } from './constants';

// The initial state of the App
export const initialState = {

};

const menuReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_MENU:       
        break;
    }
  });
export default menuReducer;
