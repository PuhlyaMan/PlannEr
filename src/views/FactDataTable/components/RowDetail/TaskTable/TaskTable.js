import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
  GroupingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  Toolbar,
  SearchPanel,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import TableRow from './components/TableRow/TableRow.js';
import TableCell from './components/TableCell/TableCell.js';
import TableCellHeader from './components/TableCellHeader/TableCellHeader.js';
import ContentComponent from './components/ContentComponent/ContentComponent.js';
import SortLabel from './components/SortLabel/SortLabel.js';
import FixedColumns from './components/FixedColumns/FixedColumns.js';
import ToolbarRoot from './components/ToolbarRoot/ToolbarRoot.js';
//import TableBandHeaderCell from './components/TableBandHeaderCell/TableBandHeaderCell.js';
import * as settings from './settings/settings.js';
import * as localisation from 'assets/data/ru.js';

const getRowId = row => row.id;

const TaskTable = ({ row }) => {
  const [columns, setColumns] = useState(settings.columns);
  const [rows, setRows] = useState([]);
  const [tableColumnExtensions, setTableColumnExtensions] = useState(settings.tableColumnExtensions);
  const [colorCalenadr, setColorCalenadr] = useState({});

  useEffect(() => {
    setRows(row.tasks);
  }, [row.tasks]);

  const cellComponent = restProps => <TableCell {...restProps} colorCalenadr={colorCalenadr} />;
  const cellHeaderComponent = restProps => <TableCellHeader {...restProps} colorCalenadr={colorCalenadr} />;
  const rowComponent = restProps => <TableRow {...restProps} />;
  const contentComponent = restProps => <ContentComponent {...restProps} />;
  const sortLabelComponent = restProps => <SortLabel {...restProps} colorCalenadr={colorCalenadr} />;
  const cellFixedComponent = restProps => <FixedColumns {...restProps} />;
  const rootToolbarComponent = useCallback(
    restProps => (
      <ToolbarRoot
        {...restProps}
        setColumns={setColumns}
        setTableColumnExtensions={setTableColumnExtensions}
        setColorCalenadr={setColorCalenadr}
      />
    ),
    []
  );

  return (
    <Paper>
      <Grid getRowId={getRowId} rows={rows} columns={columns}>
        <SearchState />
        <SortingState columnExtensions={tableColumnExtensions} />
        <PagingState defaultCurrentPage={0} defaultPageSize={5} />
        <GroupingState />
        <IntegratedFiltering />
        <IntegratedSorting />
        <IntegratedPaging />
        <Table
          cellComponent={cellComponent}
          rowComponent={rowComponent}
          messages={localisation.table}
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow
          showSortingControls
          sortLabelComponent={sortLabelComponent}
          contentComponent={contentComponent}
          cellComponent={cellHeaderComponent}
          messages={localisation.tableHeaderRow}
        />
        <TableFixedColumns leftColumns={settings.fixedLeftColumns} cellComponent={cellFixedComponent} />
        <Toolbar rootComponent={rootToolbarComponent} />
        <SearchPanel messages={localisation.searchPanel} />
        <PagingPanel messages={localisation.pagingPanel} />
      </Grid>
    </Paper>
  );
};

TaskTable.propTypes = {
  row: PropTypes.object,
};

export default TaskTable;
