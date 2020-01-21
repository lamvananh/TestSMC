import produce from 'immer';
import { CHANGE_MENU, CHANGE_SIDE_MENU_STATE } from './constants';

// The initial state of the App
export const initialState = {
  sideMenuOpened: false
};

const menuReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_SIDE_MENU_STATE:
        draft.sideMenuOpened = action.isOpened;        
        break;
    }
  });
export default menuReducer;
