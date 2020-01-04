/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_TAB } from './constants';

// The initial state of the App
export const initialState = {
  tabs: [{ id: 1, name: "Dash board", iconSrc: "https://image.flaticon.com/icons/svg/148/148841.svg",selected:true }
    , { id: 2, name: "Quản lý đỗ xe", iconSrc: "https://image.flaticon.com/icons/svg/148/148800.svg",selected:false }
  , { id: 3, name: "Quản lý phòng cháy chữa cháy", iconSrc: "https://image.flaticon.com/icons/svg/148/148800.svg",selected:false }],
};
/* eslint-disable default-case, no-param-reassign */
const tabReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_TAB:
        draft.tabs.map(item => item.id == action.selectedTab.id ? item.selected = true : item.selected = false);
        break;
    }
  });
export default tabReducer;
