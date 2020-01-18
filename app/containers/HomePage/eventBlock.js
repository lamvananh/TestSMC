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
import { Doughnut } from 'react-chartjs-2';
import Highcharts3d from 'highcharts/highcharts-3d';
import BlockTable from '../../components/BlockTable';
import Block from '../../components/Block';
import { makeSelectEvents } from './selectors';
const borderRadius = require('highcharts-border-radius');

// Highcharts3d(Highcharts);
borderRadius(Highcharts);
Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: 'Lato',
    },
  },
  colors: [
    '#6ea0fd',
    '#253b65',
    '#345ca7',
    '#a8aab5',
    '#24CBE5',
    '#64E572',
    '#FF9655',
    '#FFF263',
    '#a8aab5',
  ],
});
const key = 'smc-event-block';
const EventBlockContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  align-items: flex-start;
  grid-template-areas:
    'quantify percent'
    'table table';
  & .scm-grid-item {
    height: 100%;
  }
`;
const QuantifyChart = styled.div`
  grid-area: quantify;
`;
const PercentChart = styled.div`
  grid-area: percent;
`;
const NewEventTable = styled.div`
  width: 100%;
  height: 20%;
  grid-area: table;
  & .MuiTableCell-root {
    padding: 4px 10px;
  }
  & .MuiPaper-elevation1 {
    box-shadow: none;
  }
`;

function menuClick(e) {
  console.log('eeeeeeeeeeeeeeeee', e);
}

const columns = [
  { id: 'id', title: 'id', width: '10%' },
  ,
  { id: 'thoigian', title: 'Thời gian', width: '20%' },
  { id: 'hethong', title: 'Hệ thống', width: '20%' },
  { id: 'sukien', title: 'Sự kiện', width: '25%' },
  { id: 'mucdo', title: 'Mức độ', width: '25%' },
];
export function EventBlock({ smcEvent }) {
  useInjectReducer({ key, reducer });
  const menuConfig = {
    items: [
      { id: 'menu0', title: 'Xuất Pdf' },
      { id: 'menu1', title: 'View Camera' },
    ],
    onClick: menuClick,
  };
  const ChatOp1 = {
    chart: {
      type: 'column',
      height: '60%',
    },
    title: {
      text: 'Số lượng sự kiện',
      style: { fontSize: '14px', fontWeight: 600 },
    },
    xAxis: {
      categories: ['HT1', 'HT2', 'HT3', 'HT4', 'HT5'],
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
      stackLabels: {
        enabled: false,
        style: {
          fontWeight: 'bold',
          color:
            // theme
            (Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            'gray',
        },
      },
    },
    legend: {
      align: 'right',
      x: 3,
      verticalAlign: 'top',
      y: 25,
      floating: false,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 0,
      shadow: false,
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
    },
    plotOptions: {
      column: {
        pointWidth: 15,
        backgroundColor: 'red',
        stacking: 'normal',
        dataLabels: {
          enabled: false,
        },
      },
      borderRadius: 10,
    },
    series: [
      {
        name: 'Nghiêm trọng',
        data: [5, 3, 4, 7, 2],
      },
      {
        name: 'Thấp',
        data: [2, 2, 3, 2, 1],
      },
      {
        name: 'Trung bình',
        data: [3, 4, 4, 2, 5],
      },
    ],
  };
  const chartQuantifyOptions = {
    chart: {
      height: '200px',
      renderTo: 'container',
      type: 'column',
    },
    title: {
      text: 'Số lượng sự kiện',
    },
    subtitle: {
      text: '',
    },
    plotOptions: {
      column: {
        pointWidth: 15,
        depth: 15,
        borderRadiusTopLeft: 15,
        borderRadiusTopRight: 15,
        backgroundColor: 'red',
      },
    },
    series: [
      {
        data: smcEvent.quantifyChartData,
      },
    ],
  };

  const chartPercentOptions = {
    labels: ['Red', 'Green', 'Yellow'],
    datasets: [
      {
        data: smcEvent.percentChartData,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  const chartPercent2Option = {
    chart: {
      height: '60%',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Tỷ trọng sự kiện',
      margin: 20,
      style: { fontSize: '14px', fontWeight: 600 },
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b> \n {series.name}',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format:
            '<div style="display:flex;align-items:center;flex-direction: column;line-height: 10px;"><span style="font-size:16px;">{point.percentage:.1f} %</span> <br/> <b>{point.name}</b></div>',
          connectorWidth: 0,
          alignTo: 'toPlotEdges',
          useHTML: true,
          crop: false,
          overflow: 'none',
          connectorPadding: 0,
        },
        innerSize: 50,
        edgeWidth: 5,
        edgeColor: 'red',
        size: '80%',
      },
    },
    series: [
      {
        name: '',
        colorByPoint: true,
        data: [
          {
            name: 'Thấp',
            y: 60,
            sliced: false,
            selected: true,
          },
          {
            name: 'Nghiêm trọng',
            y: 10,
          },
          {
            name: 'Trung bình',
            y: 30,
          },
        ],
      },
    ],
  };

  const MainContent = (
    <EventBlockContainer className="scm-grid">
      <QuantifyChart className="scm-grid-item">
        <HighchartsReact
          highcharts={Highcharts}
          options={ChatOp1}
          style={{ height: 300 }}
        />
      </QuantifyChart>
      <PercentChart className="scm-grid-item">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartPercent2Option}
        />
        {/* <Doughnut data ={chartPercentOptions}></Doughnut> */}
      </PercentChart>
      <NewEventTable className="scm-grid-item">
        <BlockTable
          title="Danh sách sự kiện mới"
          rows={smcEvent.table.rows}
          columns={columns}
        />
      </NewEventTable>
      <div />
    </EventBlockContainer>
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
EventBlock.propTypes = {};

const mapStateToProps = createStructuredSelector({
  smcEvent: makeSelectEvents(),
});

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(EventBlock);
