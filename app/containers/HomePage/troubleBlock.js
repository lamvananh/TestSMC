import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import reducer from 'reducer';
import { compose } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3d from 'highcharts/highcharts-3d';
import { makeSelectTroubles } from './selectors';
import Block from '../../components/Block';
import BlockTable from '../../components/BlockTable';
const borderRadius = require('highcharts-border-radius');

// Highcharts3d(Highcharts);
borderRadius(Highcharts);
Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: 'Lato',
    },
  },
});
const key = 'smc-event-block';
const TroubleBlockContainer = styled.div``;
const TroubleChart = styled.div``;
function menuClick(e) {

}

export function TroubleBlock({ smcTrouble }) {
  useInjectReducer({ key, reducer });
  const menuConfig = {
    items: [
      { id: 'menu0', title: 'Xuất Pdf' },
      { id: 'menu1', title: 'View Camera' },
    ],
    onClick: menuClick,
  };
  const chartQuantifyOptions = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Monthly Average Temperature',
    },
    subtitle: {
      text: 'Source: WorldClimate.com',
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yAxis: {
      title: {
        text: 'Temperature',
      },
      labels: {
        formatter() {
          return `${this.value}°`;
        },
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1,
        },
      },
    },
    series: [
      {
        name: 'Hà Nội',
        marker: {
          symbol: 'square',
        },
        data: smcTrouble.chartData,
      },
    ],
  };

  const MainContent = (
    <TroubleBlockContainer>
      <TroubleChart>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartQuantifyOptions}
        />
      </TroubleChart>
    </TroubleBlockContainer>
  );
  return (
    <Block
      title="Sự kiện"
      description="Đang xử lý"
      countNumber="20"
      mainComponent={MainContent}
      height="400px"
      menuConfig={menuConfig}
    />
  );
}

function shouldNotRerender(prevProps, nextProps) {
  return false;
}
TroubleBlock.propTypes = {};

const mapStateToProps = createStructuredSelector({
  smcTrouble: makeSelectTroubles(),
});

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(TroubleBlock);
