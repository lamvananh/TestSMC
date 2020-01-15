/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );
const makeSelectEvents = () =>
  createSelector(
    selectHome,
    homeState => homeState.eventBlockData,
  );
const makeSelectTroubles = () =>
  createSelector(
    selectHome,
    homeState => homeState.troubleBlockData,
  );

export { selectHome, makeSelectUsername,makeSelectEvents,makeSelectTroubles };
