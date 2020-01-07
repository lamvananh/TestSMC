import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTabs = state => state.tabs || initialState;

const makeSelectTabList = () =>
  createSelector(
    selectTabs,
    tabState => tabState.tabs,
  );

export { selectTabs, makeSelectTabList };
