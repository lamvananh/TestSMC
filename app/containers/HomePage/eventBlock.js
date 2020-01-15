import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import reducer from 'reducer';
import { compose } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectEvents } from './selectors';
import Block from '../../components/Block';
import BlockTable from '../../components/BlockTable';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { Doughnut } from 'react-chartjs-2';
const borderRadius = require('highcharts-border-radius');
import Highcharts3d from "highcharts/highcharts-3d";

// Highcharts3d(Highcharts);
borderRadius(Highcharts);
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Open Sans'
        }
    }
});
const key = 'smc-event-block';
const EventBlockContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    align-items: flex-start;
    grid-template-areas:'quantify percent'
    'table table'
`;
const QuantifyChart = styled.div`
    grid-area: quantify;
`;
const PercentChart = styled.div`
grid-area: percent;
`;
const NewEventTable = styled.div`
width: 100%;
height: 150px;
grid-area: table;
& .MuiTableCell-root{
    padding:4px 10px;
}
& .MuiPaper-elevation1{
    box-shadow: none;
}
`

function menuClick(e) {
    console.log("eeeeeeeeeeeeeeeee", e);
}

const columns = [{ id: "id", title: "id", width: "50px" }
    , { id: "thoigian", title: "Thời gian", width: "110px" }
    , { id: "hethong", title: "Hệ thống", width: "120px" }
    , { id: "sukien", title: "Sự kiện", width: "200px" }
    , { id: "mucdo", title: "Mức độ", width: "100px" }];
export function EventBlock({ smcEvent }) {
    useInjectReducer({ key, reducer });
    const menuConfig = { items: [{ id: "menu0", title: "Xuất Pdf" }, { id: "menu1", title: "View Camera" }], onClick: menuClick }
    const chartQuantifyOptions = {
        chart: {
            height: "60%",
            renderTo: 'container',
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 50,
                viewDistance: 25
            }
        },
        title: {
            text: 'Số lượng sự kiện'
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            column: {
                pointWidth: 15,
                depth: 15,
                borderRadiusTopLeft: 15,
                borderRadiusTopRight: 15,
                backgroundColor: 'red'
            }
        },
        series: [{
            data: smcEvent.quantifyChartData
        }]
    }

    const chartPercentOptions = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{
            data: smcEvent.percentChartData,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };
    const chartPercent2Option = {
        chart: {
            height: "60%",
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Tỷ trọng sự kiện',
            margin: 10
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b> \n {series.name}'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<div style="display:flex;align-items:center;flex-direction: column;line-height: 10px;"><span style="font-size:16px;">{point.percentage:.1f} %</span> <br/> <b>{point.name}</b></div>',
                    connectorWidth: 0,
                    alignTo: "toPlotEdges",
                    useHTML: true,
                    crop: false,
                    overflow: "none",
                    connectorPadding: 0
                },
                innerSize: 50,
                edgeWidth: 5,
                edgeColor: 'red',
                size: "80%",
            }
        },
        series: [{
            name: '',
            colorByPoint: true,
            data: [{
                name: 'Nghiêm trọng',
                y: 60,
                sliced: false,
                selected: true
            }, {
                name: 'Thấp',
                y: 30
            }, {
                name: 'Trung bình',
                y: 10
            }]
        }]
    }

    const MainContent = (<EventBlockContainer>
        <QuantifyChart>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartQuantifyOptions}
            />
        </QuantifyChart>
        <PercentChart style={{ height: "150px" }} >
            <HighchartsReact
                highcharts={Highcharts}
                options={chartPercent2Option}
            />
            {/* <Doughnut data ={chartPercentOptions}></Doughnut> */}
        </PercentChart>
        <NewEventTable>
            <BlockTable title ="Danh sách sự kiện mới" rows={smcEvent.table.rows} columns={columns} ></BlockTable>
        </NewEventTable>
        <div></div>
    </EventBlockContainer>)
    return <Block title="Sự kiện" description="Đang xử lý" countNumber="20" mainComponent={MainContent} height="400px"
        menuConfig={menuConfig}>
    </Block>
}

function shouldNotRerender(prevProps, nextProps) {
    return false;
}
EventBlock.propTypes = {

};

const mapStateToProps = createStructuredSelector({
    smcEvent: makeSelectEvents()
});

export function mapDispatchToProps(dispatch) {
    return {

    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(
    withConnect,
)(EventBlock);
