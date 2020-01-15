/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMenus = state => state || initialState;


const makeSideBarOpen = () =>{
  createSelector(
    selectMenus,
    menuState => menuState.sideMenuOpened,
  );
}

export { selectMenus,makeSideBarOpen };
