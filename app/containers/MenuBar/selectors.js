/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMenus = state => state.menu || initialState;

const makeSelectMenuList = () =>
  createSelector(
    selectMenus,
    menuState => menuState.menu,
  );

export { selectMenus, makeSelectMenuList };
