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
const tabLibrary = [{ id: 1, name: "Dash board", iconSrc: "https://image.flaticon.com/icons/svg/148/148841.svg", selected: true, url: "/" }
  , { id: 2, name: "Quản lý đỗ xe", iconSrc: "https://image.flaticon.com/icons/svg/148/148800.svg", selected: false, url: "/parking/manager" }
  , { id: 3, name: "Quản lý phòng cháy chữa cháy", iconSrc: "https://image.flaticon.com/icons/svg/148/148800.svg", selected: false, url: "/fire-alarm" }];
// The initial state of the App
export const initialState = {
  tabs: [{ id: 1, name: "Dash board", iconSrc: "https://image.flaticon.com/icons/svg/148/148841.svg", selected: true, url: "/" }]
};
/* eslint-disable default-case, no-param-reassign */
const tabReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_TAB:
        console.log("reduce change.....", action);
        draft.tabs.map(item => item.id == action.selectedTab.id ? item.selected = true : item.selected = false);
        break;
      case REMOVE_TAB:
        let indexTab = draft.tabs.findIndex(tab => tab.id == action.selectedTab.id);
        if (indexTab == 0 && draft.tabs.length == 1) {
            // neu la tab cuoi cung thi khong cho dong tab

        } else {
          console.log("indexTab tab reducer", indexTab);
          draft.tabs = draft.tabs.filter(item => item.id != action.selectedTab.id);
          if (indexTab >= 0 && indexTab <= draft.tabs.length - 1) { // nếu còn có tab ở bên phải tab hiện tại
            if (!draft.tabs.find(item => item.selected == true)) {
              draft.tabs[indexTab].selected = true;
              console.log("tab reducer SELECTED...........", draft);
            }
          } else if (indexTab > 0) {
            draft.tabs[indexTab - 1].selected = true;
          }
        }
        break;
      case ADD_TAB:
        let item = draft.tabs.find(item => item.url == action.tab);
        if (item) {
          draft.tabs.map(item => item.selected = false);
          item.selected = true;
        } else {
          let itemInLibrary = tabLibrary.find(item => item.url == action.tab);
          if (itemInLibrary) {
            draft.tabs.map(item => item.selected = false);
            draft.tabs.push({ ...itemInLibrary, selected: true });
          }
        }

        break;
    }
  });

export default tabReducer;
