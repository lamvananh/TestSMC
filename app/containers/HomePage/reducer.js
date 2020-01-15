/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_USERNAME } from './constants';

// The initial state of the App
export const initialState = {
  username: '',
  eventBlockData: {
    table: {
      rows: [
        {
          id: 1,
          thoigian: '03:21:20',
          hethong: 'Camera',
          sukien: 'Đối tượng truy nã',
          mucdo: 'h',
        },
        {
          id: 2,
          thoigian: '03:00:20',
          hethong: 'Báo cháy',
          sukien: 'Phát hiện khói',
          mucdo: 'l',
        },
        {
          id: 3,
          thoigian: '01:00:20',
          hethong: 'BMS',
          sukien: 'Sự cố chập điện',
          mucdo: 'm',
        },
        {
          id: 4,
          thoigian: '01:00:20',
          hethong: 'BMS',
          sukien: 'Sự cố chập điện',
          mucdo: 'm',
        },
        {
          id: 5,
          thoigian: '01:00:20',
          hethong: 'BMS',
          sukien: 'Sự cố chập điện',
          mucdo: 'm',
        },
        {
          id: 6,
          thoigian: '01:00:20',
          hethong: 'BMS',
          sukien: 'Sự cố chập điện',
          mucdo: 'm',
        },
      ],
    },
    quantifyChartData: [29.9, 71.5, 106.4, 129.2, 144.0],
    percentChartData: [300, 50, 100],
  },
  troubleBlockData: {
    chartData: [
      7.0,
      6.9,
      9.5,
      14.5,
      18.2,
      21.5,
      25.2,
      {
        y: 26.5,
        marker: {
          symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)',
        },
      },
      23.3,
      18.3,
      13.9,
      9.6,
    ],
  },
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        // Delete prefixed '@' from the github username
        draft.username = action.username.replace(/@/gi, '');
        break;
    }
  });

export default homeReducer;
