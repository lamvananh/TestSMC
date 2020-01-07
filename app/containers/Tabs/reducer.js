/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_TAB, ADD_TAB, REMOVE_TAB } from './constants';

// The initial state of the App
export const initialState = {
  tabs: [{ id: 1, name: "Dash board", iconSrc: "https://image.flaticon.com/icons/svg/148/148841.svg", selected: true, url: "/" }
    , { id: 2, name: "Quản lý đỗ xe", iconSrc: "https://image.flaticon.com/icons/svg/148/148800.svg", selected: false, url: "/features" }
    , { id: 3, name: "Quản lý phòng cháy chữa cháy", iconSrc: "https://image.flaticon.com/icons/svg/148/148800.svg", selected: false, url: "/fire-alarm" }],
};
/* eslint-disable default-case, no-param-reassign */
const tabReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_TAB:
        console.log("reduce change.....",action);
        draft.tabs.map(item => item.id == action.selectedTab.id ? item.selected = true: item.selected = false);
        break;
      case REMOVE_TAB:
        let indexTab = draft.tabs.findIndex(tab => tab.id == action.selectedTab.id);
        console.log("indexTab tab reducer",indexTab);
        draft.tabs = draft.tabs.filter(item => item.id != action.selectedTab.id);
        if (indexTab >= 0 && indexTab <= draft.tabs.length - 2) { // nếu còn có tab ở bên phải tab hiện tại
          if (!draft.tabs.find(item => item.selected == true)) {
            draft.tabs[indexTab].selected = true;
            console.log("tab reducer SELECTED...........",draft );
          }
        }
        break;
      case ADD_TAB:
        draft.tabs.push(action.tab);
        break;
    }
  });
  
export default tabReducer;
