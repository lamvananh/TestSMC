/**
 *
 * Icon16.js
 *
 * Renders an image with size is 16px;
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import { Scrollbars } from 'react-custom-scrollbars';

const RowHeader = styled.div`
    width: 100%;
    padding:4px;
    display:flex;
    display: table;
    & div{
      padding: 4px 10px;
      display: table-cell;
      overflow:hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }    
`
const Title = styled.div`
  font-size:14px;
  font-weight: 600;
`;
const TableBox = styled.div`
   margin-top:10px
  `;
const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  container:{

  }
});

function BlockTable({ title, rows, columns }) {
  const classes = useStyles2();
  return <TableBox>
    <Title>{title}</Title>
    <RowHeader>
      {columns.map(col => 
        <div key={col.id} style={{ width: col.width,maxWidth:col.width }}>{col.title}</div>
      )}
    </RowHeader>
    <Scrollbars style={{ width: "100%", height: 80 }}>
      <TableContainer component={Paper} className={classes.container}>
        <Table stickyHeader className={classes.table} >
          {/* <TableHead className={classes.header}>
            <TableRow>
                {columns.map(column => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                    >
                        {column.label}
                    </TableCell>
                ))}
          </TableRow>
          </TableHead> */}
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                {columns.map(col => (
                  <TableCell key={"cell"+col.id} style={{width:col.width,maxWidth:col.width, boxSizing:"border-box"}}>{row[col.id]}</TableCell>
                ))}
              </TableRow>
            ))}
            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
              </TableRow>
          )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbars>
</TableBox>
}

// We require the use of src and alt, only enforced by react in dev mode
BlockTable.propTypes = {
  rows: PropTypes.array
  , columns: PropTypes.array
  , title: PropTypes.string
};

export default BlockTable;